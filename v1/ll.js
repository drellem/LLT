//Implements the Lucas-Lehmer Test

//Numbers are represented as Uint32Arrays in binary beginning with the least
//significant bit. The array is terminated with -1.
//Returns true if 2^n-1 is a prime and false otherwise
function ll(n){
    var s = new Uint32Array(2n);
    s[0]=0;
    s[1]=0;
    s[2]=1;//set s to 4.
    s[3]=-1;
    var m = new Uint32Array(n+1);
    var temp = n-1;
    for(var i = 0; i<temp;i++)
	m[i]=1; //this should set m to 2^n-1 : the Mersenne number
    for(var i = 3; i<n;i++){
	square(s);
	subtract(s,[0,1]);//[0,1]=2
	mod(s,n);//these use side effects
    }

    return isZero(s);
}

function isZero(a){
    for(var i = 0; i < a.length;i++)
	if(a[i])return false;
    return true;
}

//Fails if b>a
function subtract(a,b){
    var t;
    var u;
    var j = 0;
    for(var i = 0; b[i]!==-1; i++){
	t = b[i];
	u = a[i];
	j = i;
	if(t){
	    if(u)a[i]=t-u;
	    else a[i]=t;
	} else {
	    if(u){
		borrow(a,i);
		a[i]=b[i];
	    } else a[i]=0;
	}
    }
    a[j+1]=-1;
}

function borrow(a,i){
    j=i+1;
    x=a[i];
    y=a[j];
    if(y){
	a[j]-=1;
	a[i]+=1;
    } else {
	borrow(a,j);
	a[j]-=1;
	a[i]+=1;
    }
}
function mod(a,n){
    var b = new Uint32Array(a.length);
    var j;
    while(count(a)>n){
	j=0;
	for(var i = n; a[i]!==-1; i++)
	    b[i-n]=a[i];
	b[j+1]=-1;
	a[n]=-1;
	add(a,b);
    }
}

function count(a){
    var j = 0;
    for(; a[j]!==-1;j++);
    return j;
}
//Fails if b<a
function add(a,b){
    var x;
    var y;
    var j = 0;
    for(var i = 0; b[i]!==-1; i++){
	x=a[i];
	y=b[i];
	j=i;
	if(y){
	    if(x){
		a[i]=0;
		carry(a,i);
	    } else a[i]=1;
	} else a[i]=x;
    }
    a[j+1]=-1;
}
//TODO
function square(a){}
    