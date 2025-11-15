class HelperFunctions {
  constructor() {}

  getDateAndTime = () => {
    const date = new Date();

    const formattedDateAndTime = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} : ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return formattedDateAndTime;
  };
}

export const HelperFunctionsClass = new HelperFunctions();
