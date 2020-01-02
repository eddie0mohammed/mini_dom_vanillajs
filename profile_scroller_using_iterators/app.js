

const data =[
    {
        name: 'John Doe',
        age: 32,
        gender: "Male",
        lookingFor: 'female',
        location: 'Boston Ma',
        image: 'https://randomuser.me/api/portraits/men/82.jpg'
    },
    {
        name: 'Nico Collie',
        age: 24,
        gender: "Male",
        lookingFor: 'female',
        location: 'San Diego CA',
        image: 'https://randomuser.me/api/portraits/men/83.jpg'
    },
    {
        name: 'Terry Cho',
        age: 31,
        gender: "Male",
        lookingFor: 'female',
        location: 'Seatle Wa',
        image: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    {
        name: 'Sisa Valkova',
        age: 27,
        gender: "Female",
        lookingFor: 'male',
        location: 'Vancouver Ca',
        image: 'https://randomuser.me/api/portraits/women/82.jpg'
    },
    {
        name: 'Miska Stankova',
        age: 28,
        gender: "Female",
        lookingFor: 'male',
        location: 'Boston Ma',
        image: 'https://randomuser.me/api/portraits/women/81.jpg'
    }
];

const profiles = profileIterator(data);

//Call first profile
nextProfile();

//next 
document.getElementById('next').addEventListener('click', nextProfile);

//next profile
function nextProfile(){
    
    const currentProfile = profiles.next().value;

    if (currentProfile !== undefined){


        document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${currentProfile.name}</li>
            <li class="list-group-item">Age: ${currentProfile.age}</li>
            <li class="list-group-item">Location: ${currentProfile.location}</li>
            <li class="list-group-item">Gender: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
        </ul>
        `;

        document.getElementById('imageDisplay').innerHTML = `
            <img src="${currentProfile.image}">
        `;  
    }else{
        window.location.reload();
    }

}


//profile Iterator Event

function profileIterator(profiles){
    let nextIndex = 0;

    return {
        next: function(){
            return nextIndex < profiles.length ?
            { value: profiles[nextIndex++], done: false } :
            { done : true }
            
        }
    };
}