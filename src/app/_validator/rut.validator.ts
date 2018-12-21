import { AbstractControl } from '@angular/forms';

export class RutValidador {
  static rutFormat(control: AbstractControl){	
    let texto = control.value;
    var tmpstr = "";	
    for (let i=0; i < texto.length ; i++ )		
      if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
        tmpstr = tmpstr + texto.charAt(i);	
    texto = tmpstr;	
    let largo = texto.length;	
  
    if ( largo < 2 )	
    {					
      return { rutFormat: true };	
    }	
  
    for (let i=0; i < largo ; i++ )	
    {			
      if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
      {							
        return { rutFormat: true };		
      }	
    }	
  
    var invertido = "";	
    for (let i=(largo-1),j=0; i>=0; i--,j++ )		
      invertido = invertido + texto.charAt(i);	
    var dtexto = "";	
    dtexto = dtexto + invertido.charAt(0);	
    dtexto = dtexto + '-';	
    let cnt = 0;	
  
    for (let i=1,j=2; i<largo; i++,j++ ){		
  
      if ( cnt == 3 ){			
        dtexto = dtexto + '.';			
        j++;			
        dtexto = dtexto + invertido.charAt(i);			
        cnt = 1;		
      }else{				
        dtexto = dtexto + invertido.charAt(i);			
        cnt++;		
      }	
    }	
  
    invertido = "";	
    for (let i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
      invertido = invertido + dtexto.charAt(i);	
  
    if ( revisarDigito2(texto) )		
      return null;	
  
    return { rutFormat: true };
  }
}  
  
function revisarDigito(dvr: string){	
  let dv = dvr + ""	
  if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	{				
    return false;	
  }	
  return true;
}

function revisarDigito2( crut: string){	
  let largo = crut.length;	
  if ( largo < 2 ){				
    return false;	
  }	
  let rut = '';
  if ( largo > 7 )
    rut = crut.substring(0, largo - 1);	  
  else		
    rut = crut.charAt(0);	
  let dv = crut.charAt(largo-1);	
  revisarDigito( dv );	

  if ( rut == null || dv == null )
    return 0	

  var dvr = '0'	
  let suma: number = 0	
  let mul  = 2	

  for (let i= rut.length -1 ; i >= 0; i--){	
    suma = suma + Number(rut.charAt(i)) * mul		
    if (mul == 7)			
      mul = 2		
    else    			
      mul++	
  }	
  let res = suma % 11	
  if (res==1)		
    dvr = 'k'	
  else if (res==0)		
    dvr = '0'	
  else{		
    let dvi = 11-res		
    dvr = dvi + ""	
  }
  if ( dvr != dv.toLowerCase() ){		
    return false	
  }

  return true
}




