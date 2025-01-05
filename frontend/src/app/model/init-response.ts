export interface InitResponse {
  userId: string;
  testCasesCheckedCount: number;
  testCasesAllCount: number;
}

export interface LoginFormInitResponse extends InitResponse {
  username: string;
  password: string;
}
