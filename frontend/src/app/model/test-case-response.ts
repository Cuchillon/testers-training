export interface TestCaseResponse {
  userId: string;
  testCasesCheckedCount: number;
  testCaseType: 'POSITIVE'|'NEGATIVE';
}

export interface LoginFormTestCaseResponse extends TestCaseResponse {
  errorMessage?: string;
}
