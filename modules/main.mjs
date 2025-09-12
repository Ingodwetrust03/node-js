class User {
  constructor(name = '', dateBirth = '', purpose = '') {
    this.id = this.generateUserID(); // случайны id из 10 символов
    this.firstName = this.generateFirstName(name); // первая буква большая, остальные строчные
    this.lastName = this.generateLastName(name); // первая буква большая, остальные строчные
    this.dateBirth = dateBirth;
    this.age = this.generateUserAge(dateBirth); // высчитывается возраст на текущий день
    this.purpose = this.generatePurpose(purpose); // первая буква большая, остальные строчные
  }

  generateUserID = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  generateFirstName = name => {
    const array = name.trim().split(' ');
    return array[0].charAt(0).toUpperCase() + array[0].slice(1);
  };

  generateLastName = name => {
    const array = name.trim().split(' ');
    return (
      array[array.length - 1].charAt(0).toUpperCase() +
      array[array.length - 1].slice(1)
    );
  };

  generateUserAge = dateBirth => {
    const now = Date.now();
    const dateObject = new Date(dateBirth).getTime();
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;

    return Math.floor((now - dateObject) / millisecondsPerYear);
  };

  generatePurpose = purpose => {
    const array = purpose.trim().split(' ');
    let firstWord = '';
    let string = '';

    array.forEach((element, index) => {
      if (index === 0) {
        firstWord = array[0].charAt(0).toUpperCase() + array[0].slice(1);
      } else {
        string += ` ${element.toLowerCase()}`;
      }
      return string;
    });

    return `${firstWord} ${string}`;
  };
}

export { User };
