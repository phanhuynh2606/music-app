import unidecode from "unidecode";

export const convertToSlug = (text:string): string =>{
   const stringUnidecode = unidecode(text).trim();

   console.log("1"+stringUnidecode);

   const slug: string = stringUnidecode.replace(/\s+/g, "-");
   console.log(text);
   console.log(slug);
   return slug;
 }