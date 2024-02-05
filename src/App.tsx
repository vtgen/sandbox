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

// Function to select component based on field type
function getFieldComponent(field: Field) {
  switch (field.type) {
    case FieldType.Name:
      return NameComponent;
    case FieldType.Phone:
      return PhoneComponent;
    default:
      return () => <div>Unsupported field type</div>;
  }
}

// Dynamically render components based on field type
const DynamicFieldRenderer: React.FC<{ fields: Field[] }> = ({ fields }) => (
  <>
    {fields.map((field, index) => {
      const Component = getFieldComponent(field);
      return <Component key={index} {...field} />;
    })}
  </>
);

// Usage example
const userFields: Field[] = [
  { type: FieldType.Name, first: "John", last: "Doe" },
  { type: FieldType.Phone, value: "123-456-7890" },
];
