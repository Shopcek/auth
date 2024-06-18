import randomString from "../../../../helpers/random-string";

export default {
  async beforeCreate(event: any) {
    event.params.data.secretKey = randomString(15);
  },
};
