import React from 'react';

export default function App() {
  return (
    <div className="App">
      <DynamicFieldRenderer fields={userFields} />
    </div>
  );
}

// Using enum for field types
enum FieldType {
  Name = 'Name',
  Phone = 'Phone',
}

// Simplify field interfaces by using a discriminated union
type Field = 
  | { type: FieldType.Name; first: string; last: string }
  | { type: FieldType.Phone; value: string };

// Example components for each field type
const NameComponent: React.FC<{ first: string; last: string }> = ({ first, last }) => (
  <div>
    <input placeholder="First Name" defaultValue={first} />
    <input placeholder="Last Name" defaultValue={last} />
  </div>
);

const PhoneComponent: React.FC<{ value: string }> = ({ value }) => (
  <input placeholder="Phone Number" defaultValue={value} type="tel"/>
);

function isNameField(field: Field): field is { type: FieldType.Name; first: string; last: string } {
  return field.type === FieldType.Name;
}

// Function to determine if a field is a PhoneField
function isPhoneField(field: Field): field is { type: FieldType.Phone; value: string } {
  return field.type === FieldType.Phone;
}

// Dynamically render components based on field type with type checks
const DynamicFieldRenderer: React.FC<{ fields: Field[] }> = ({ fields }) => (
  <>
    {fields.map((field, index) => {
      if (isNameField(field)) {
        return <NameComponent key={index} {...field} />;
      } else if (isPhoneField(field)) {
        return <PhoneComponent key={index} {...field} />;
      } else {
        // Handle unsupported field types if necessary
        return <div key={index}>Unsupported field type</div>;
      }
    })}
  </>
);

// Usage example
const userFields: Field[] = [
  { type: FieldType.Name, first: "John", last: "Doe" },
  { type: FieldType.Phone, value: "123-456-7890" },
];
