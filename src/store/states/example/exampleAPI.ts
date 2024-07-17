// Simulate an API call
export const fetchExampleData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  