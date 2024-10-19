import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let balance: number;
  let account: BankAccount | null;

  beforeEach(() => {
    balance = 100;
    account = getBankAccount(balance);
  });

  afterEach(() => {
    balance = 0;
    account = null;
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account?.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 200;

    expect(() => account?.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 200;
    const targetAccount = getBankAccount(0);

    expect(() => account?.transfer(transferAmount, targetAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 200;

    expect(() => account?.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositAmount = 200;

    expect(account?.deposit(depositAmount).getBalance()).toBe(
      balance + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const withdrawAmount = 50;

    expect(account?.withdraw(withdrawAmount).getBalance()).toBe(
      balance - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const transferAmount = 50;

    const targetAccountBalance = 0;
    const targetAccount = getBankAccount(targetAccountBalance);

    account?.transfer(transferAmount, targetAccount);

    expect(account?.getBalance()).toBe(balance - transferAmount);
    expect(targetAccount.getBalance()).toBe(
      targetAccountBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = await account?.fetchBalance();

    if (fetchedBalance !== null) {
      expect(typeof fetchedBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = 50;
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockResolvedValue(fetchedBalance);

    await account?.synchronizeBalance();

    expect(account?.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchedBalance = null;
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockResolvedValue(fetchedBalance);

    await expect(account?.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(account?.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
