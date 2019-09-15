function HandleError(statusCode: number) {
  switch (statusCode) {
    case 404:
      return { code: statusCode, message: "NotFound" };
      break;
    default:
      return { code: statusCode, message: "Error Occered" };
      break;
  }
}

export default HandleError;
