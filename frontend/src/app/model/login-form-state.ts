export interface LoginFormState {
  username: string;
  password: string;
  testCasesAllCount: number;
  testCasesCheckedCount: number;
  testCaseType?: 'POSITIVE'|'NEGATIVE';
  errorMessage?: string;
}
