export class CustomValidation {
    email_pattern: string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"; // ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$
    mobile_number: string = "[0-9]*";
    first_space_disallow: string = "[a-zA-Z0-9][\\sa-zA-Z0-9]{0,50}";
    disallow_all_spaces: string = "^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$";
    alpha:any =  /^[A-Z]+$/i;
    numeric:any = /^[0-9]*\.?[0-9]+$/;
    all_numeric:any = /^[.\-+]?[0-9]*\.?[0-9]+$/;
    integer:any = /^[0-9]+$/;  
    phn_num_pattern = /^\s*(?:\+?\d{1,5})?[- (]*\d{1,5}(?:[- )]*\d{1,5})?[- ]*\d{1,4}(?: *[x/#]\d+)?\s*$/;
    password_pattern = "^[-a-zA-Z0-9-()-@$!%*?&]+(\s+[-a-zA-Z0-9-()]+)*[$@$!%*?&]*$";
    url_pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
}