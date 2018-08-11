import AbstractModel from "./AbstractModel";
import Gender from "./Gender";
import FirstName from "./FirstName";
import MiddleName from "./MiddleName";
import LastName from "./LastName";
import validate from "./validate";

export default class Anthroponym extends AbstractModel {
    /**
     * Anthroponym constructor.
     *
     * @param {object} anthroponym
     */
    constructor(anthroponym) {
        super();
        validate.anthroponymValue(anthroponym);
        this._value = {};
        this._value.gender = anthroponym.gender;

        const hasFirstName = Object.prototype.hasOwnProperty.call(anthroponym, "firstName");
        if (hasFirstName) {
            this._value.firstName = anthroponym.firstName;
        }

        const hasMiddleName = Object.prototype.hasOwnProperty.call(anthroponym, "middleName");
        if (hasMiddleName) {
            this._value.middleName = anthroponym.middleName;
        }

        const hasLastName = Object.prototype.hasOwnProperty.call(anthroponym, "lastName");
        if (hasLastName) {
            this._value.lastName = anthroponym.lastName;
        }

        this.valueOf = this.valueOf.bind(this);
        this.toObject = this.toObject.bind(this);
        this.hasFirstName = this.hasFirstName.bind(this);
        this.hasMiddleName = this.hasMiddleName.bind(this);
        this.hasLastName = this.hasLastName.bind(this);
        this.getFirstName = this.getFirstName.bind(this);
        this.getMiddleName = this.getMiddleName.bind(this);
        this.getLastName = this.getLastName.bind(this);
        this.getGender = this.getGender.bind(this);
    }

    /**
     * Get the primitive value of the specified object.
     *
     * @return {string}
     */
    valueOf() {
        return Object.values(this._value).reduce((value, attribute) => `${value} ${attribute}`, "");
    }

    /**
     * Cast the value to an object.
     *
     * @return {object}
     */
    toObject() {
        return {...this._value};
    }

    /**
     * Determine whether the anthroponym has first name.
     *
     * @return {boolean}
     */
    hasFirstName() {
        return Object.prototype.hasOwnProperty.call(this._value, "firstName");
    }

    /**
     * Determine whether the anthroponym has middle name.
     *
     * @return {boolean}
     */
    hasMiddleName() {
        return Object.prototype.hasOwnProperty.call(this._value, "middleName");
    }

    /**
     * Determine whether the anthroponym has last name.
     *
     * @return {boolean}
     */
    hasLastName() {
        return Object.prototype.hasOwnProperty.call(this._value, "lastName");
    }

    /**
     * Get first name.
     *
     * @return {FirstName}
     * @throws {ReferenceError}
     */
    getFirstName() {
        if (this.hasFirstName()) {
            return new FirstName(this._value.firstName);
        }
        throw new ReferenceError("First name is not defined.");
    }

    /**
     * Get middle name.
     *
     * @return {MiddleName}
     * @throws {ReferenceError}
     */
    getMiddleName() {
        if (this.hasMiddleName()) {
            return new MiddleName(this._value.middleName);
        }
        throw new ReferenceError("Middle name is not defined.");
    }

    /**
     * Get last name.
     *
     * @return {LastName}
     * @throws {ReferenceError}
     */
    getLastName() {
        if (this.hasLastName()) {
            return new LastName(this._value.lastName);
        }
        throw new ReferenceError("Last name is not defined.");
    }

    /**
     * Get gender.
     *
     * @return {Gender}
     */
    getGender() {
        return new Gender(this._value.gender);
    }
}
