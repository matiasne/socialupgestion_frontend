export class Commerce{
	public address:string;
	public description:string;
	public email:string;
	public id:string;
	public imgcommerce:string;
	public latitud:string;
	public longitud:string;
	public name:string;
	public phone_number:string;
	public pivot:{
		commerce_id:number,
		rol:string,
		user_id:number
	};
	public nombre:string;
	public icon:string;
  	public portada: any;
  	public lat: any;
  	public lng: any;
	public category_id: any;
	public horarios:any=[];
	public paydesks:any=[];
	public categories:any=[];
	public serviceCategories:any=[];
	public productCategories:any=[];

	constructor(
		
		){
	}
}