// --Importing and Exporting Components--
// import Gallery from './Gallery.js';
// import { Profile } from './Profile.js';

// export default function App() {
//   return (
//     <div>
//       <Profile />
//     </div>
//   );
// }


// --Writing Markup with JSX--
// export default function TodoList() {
//   return (
//     <>
//       <h1>Hedy Lamarr's Todos</h1>
//       <img 
//         src="https://i.imgur.com/yXOvdOSs.jpg" 
//         alt="Hedy Lamarr" 
//         className="photo" 
//       />
//       <ul>
//         <li>Invent new traffic lights</li>
//         <li>Rehearse a movie scene</li>
//         <li>Improve the spectrum technology</li>
//       </ul>
//     </>
//   );
// }

// --JavaScript in JSX with Curly Braces--
// const baseUrl = 'https://i.imgur.com/';
// const person = {
//   name: 'Gregorio Y. Zara',
//   imageId: '7vQD0fP',
//   imageSize: 's',
//   theme: {
//     backgroundColor: 'black',
//     color: 'pink'
//   }
// };

// export default function TodoList() {
//   return (
//     <div style={person.theme}>
//       <h1>{person.name}'s Todos</h1>
//       <img
//         className="avatar"
//         src={baseUrl + person.imageId + person.imageSize + '.jpg'}
//         alt={person.name}
//       />
//       <ul>
//         <li>Improve the videophone</li>
//         <li>Prepare aeronautics lectures</li>
//         <li>Work on the alcohol-fuelled engine</li>
//       </ul>
//     </div>
//   );
// }

// -- Passing Props to a Component --
// import { getImageUrl } from './utils.js';

// function Profile({ person, imageSize = 70 }) {
//   const imageSrc = getImageUrl(person)

//   return (
//     <section className="profile">
//       <h2>{person.name}</h2>
//       <img
//         className="avatar"
//         src={imageSrc}
//         alt={person.name}
//         width={imageSize}
//         height={imageSize}
//       />
//       <ul>
//         <li>
//           <b>Profession:</b> {person.profession}
//         </li>
//         <li>
//           <b>Awards: {person.awards.length} </b>
//           ({person.awards.join(', ')})
//         </li>
//         <li>
//           <b>Discovered: </b>
//           {person.discovery}
//         </li>
//       </ul>
//     </section>
//   )
// }

// export default function Gallery() {
//   return (
//     <div>
//       <h1>Notable Scientists</h1>
//       <Profile person={{
//         imageId: 'szV5sdG',
//         name: 'Maria Skłodowska-Curie',
//         profession: 'physicist and chemist',
//         discovery: 'polonium (chemical element)',
//         awards: [
//           'Nobel Prize in Physics',
//           'Nobel Prize in Chemistry',
//           'Davy Medal',
//           'Matteucci Medal'
//         ],
//       }} />
//       <Profile person={{
//         imageId: 'YfeOqp2',
//         name: 'Katsuko Saruhashi',
//         profession: 'geochemist',
//         discovery: 'a method for measuring carbon dioxide in seawater',
//         awards: [
//           'Miyake Prize for geochemistry',
//           'Tanaka Prize'
//         ],
//       }} />
//     </div>
//   );
// }

// -- Conditional Rendering --
// function Item({ name, isPacked }) {
//   return (
//     <li className="item">
//       {name} {isPacked ? '✅' : '❌'}
//     </li>
//   );
// }

// export default function PackingList() {
//   return (
//     <section>
//       <h1>Sally Ride's Packing List</h1>
//       <ul>
//         <Item 
//           isPacked={true} 
//           name="Space suit" 
//         />
//         <Item 
//           isPacked={true} 
//           name="Helmet with a golden leaf" 
//         />
//         <Item 
//           isPacked={false} 
//           name="Photo of Tam" 
//         />
//       </ul>
//     </section>
//   );
// }

function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}


