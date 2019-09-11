export class Commerce{
	constructor(
		public address:string,
		public description:string,
		public email:string,
		public id:number,
		public imgcommerce:string,
		public latitud:string,
		public longitud:string,
		public name:string,
		public phone_number:string,
		public pivot:{
            commerce_id:number,
            rol:string,
            user_id:number
        },
		public nombre:string,
		){
	}
}