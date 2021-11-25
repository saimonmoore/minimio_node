declare namespace jest {
  interface Matchers<R> {
    toEqualObjectList(received: any): jest.CustomMatcherResult;
  }
}
