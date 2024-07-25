let personRole="employee";
let access;

if(personRole == "employee")
{
    access = "you have access to dietery services";
} else if(personRole == "enrolledMember") {
    access = "you have access to dietery services and one on one interaction with dietician";
} else if(personRole == "subscriber"){
    access = "you have partial access to dietery services";
} else{
    personRole = "non subscriber";
    access= "you need to enroll or subscribe to avail the facility";
}

console.log("your role is " + personRole + " and "+access); 