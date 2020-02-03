const Validator = {
  email: email => {
    return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  },
  password: password => {
    return password && password.length >= 6;
  },
  name: name => {
    return name.length >= 6;
  },
  address: address => {
    return address && address.length >= 6;
  },
  phoneNumber: phneNumber => {
    return phneNumber && phneNumber.length >= 10;
  },
  quote: quote => {
    return quote.length >= 6;
  }
};

export default Validator;
