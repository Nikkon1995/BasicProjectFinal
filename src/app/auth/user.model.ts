

export class User {
    constructor(
        public email:string,
        public id:string, 
        public _token:string, 
        private _tokenExpirationDate: Date
    ) {}
}