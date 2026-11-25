import { test, expect } from '@playwright/test';

test.describe('API Test', () => {
    test('Verify JSON Placeholder API', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        });

    });
    test('Verify all the users from API', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.length).toBe(10);
    });
});