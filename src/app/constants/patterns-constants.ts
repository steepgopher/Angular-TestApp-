export class PatternsConstants {
    public static readonly EMAIL: RegExp = /^[a-zA-Z0-9]+[_a-zA-Z0-9\.-]*[a-zA-Z0-9]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})/;
    public static readonly PHONE: RegExp = /^(?:\+([0-9]{2})\s)?(\([0-9]{3}\) | [0-9]{3}-)[0-9]{3}-[0-9]{4}/;
    public static readonly PASSWORD: RegExp = /^[\d|\w]+$/;
    public static readonly CURRENCY: RegExp = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/;

}
