export const textFieldVal = (field: string) => {
  if (field.length < 2 && field !== '') {
    return true;
  } else {
    return false;
  }
};

export const textFielUserOrPsswdVal = (field: string) => {
  if (field.length < 5 && field !== '') {
    return true;
  } else {
    return false;
  }
};

export const emailVal = (email: string) => {
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
    email !== ''
  ) {
    return true;
  } else {
    return false;
  }
};
