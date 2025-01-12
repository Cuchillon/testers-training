export interface LoginFormData {
  username: string;
  password: string;
  testCasesAllCount: number;
  testCasesCheckedCount: number;
  testCaseType?: 'POSITIVE'|'NEGATIVE';
  errorMessage?: string;
}
