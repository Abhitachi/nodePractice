class Boat {
  constructor({
    hasMotor,
    motorCount,
    motorBrand,
    hasSails,
    sailsCount,
    sailsMaterial,
    sailsColor,
    hullColor,
    cabin,
  }) {
    this.hasMotor = hasMotor;
    this.motorCount = motorCount;
    this.motorBrand = motorBrand;
    this.hasSails = hasSails;
    this.sailsCount = sailsCount;
    this.sailsMaterial = sailsMaterial;
    this.sailsColor = sailsColor;
    this.hullColor = hullColor;
    this.cabin = cabin;
  }
}
//boat consturcor is too complex to be used directly
const boat = new Boat({
  hasMotor: "true",
  motorCount: 1,
  motorBrand: "Yamaha",
  hasSails: "true",
  sailsCount: 2,
  sailsMaterial: "Polyester",
  sailsColor: "White",
  hullColor: "Blue",
  cabin: "2",
});
console.log(boat, "boat");

//so we use a builder to create a boat object
class BoatBuilder {
  withMotor(hasMotor, motorCount, motorBrand) {
    this.hasMotor = hasMotor;
    this.motorCount = motorCount;
    this.motorBrand = motorBrand;
    return this;
  }
  withSails(hasSails, sailsCount, sailsMaterial, sailsColor) {
    this.hasSails = hasSails;
    this.sailsCount = sailsCount;
    this.sailsMaterial = sailsMaterial;
    this.sailsColor = sailsColor;
    return this;
  }
  withHull(hullColor) {
    this.hullColor = hullColor;
    return this;
  }
  withCabin(cabin) {
    this.cabin = cabin;
    return this;
  }
  //build method returns the  boat object
  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      cabin: this.cabin,
    });
  }
}

const boatBuilder = new BoatBuilder()
  .withMotor("true", 1, "Yamaha")
  .withSails("true", 2, "Polyester", "white")
  .withHull("blue")
  .withCabin(2)
  .build();

console.log(boatBuilder, "boatBuilder");
/**
 * the objective of the builder pattern is to separate the construction of a complex object from its representation
 *
 *
 */
