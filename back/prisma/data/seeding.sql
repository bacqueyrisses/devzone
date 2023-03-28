BEGIN;

TRUNCATE TABLE "Tool" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "ToolsOnUsers" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Avatar" RESTART IDENTITY CASCADE ;

INSERT INTO "Category"("name", "description", "order")

VALUES
    ('General', 'General Category Description', 1),
    ('Playground', 'Playground Category Description', 2);

INSERT INTO "Tool"("name", "description", "icon", "link", "order", "categoryId")

VALUES
    ('News', 'Latest developers news', 'icon','/app/news',1, 1),
    ('Search', 'Search for NPMs, Stackoverflow & Github', 'icon', '/app/search',2, 1),
    ('HTML',  'HTML, CSS and Javascript playground',  'icon', '/app/playground-html', 1, 2),
    ('Javascript', 'Pure Javascript playground',  'icon', '/app/playground-js', 2, 2);

INSERT INTO "User"("email", "password", "firstname", "lastname", "username", "active", "website")

VALUES
    ('karim@gmail.com', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Karim', 'Romdhane', 'karim', true,'https///website.com'),
    ('enzo@gmail.com', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Enzo', 'Bacqueyrisses', 'enzo', true,'https///website.com'),
    ('floriane@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Floriane', 'Perucchini', 'floriane',true, 'https///website.com'),
    ('abdel@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Abdel', 'Karim', 'abdel', true,'https///website.com'),
    ('azouaou@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Azouaou', 'Benadda', 'test', true,'https///website.com');

INSERT INTO "Bookmark"("name", "description", "link", "imgLink", "userId", "toolId")

VALUES
    ('Favorite1', 'Super favorite 1', 'link1', '/image', 1, 2),
    ('Favorite2', 'Super favorite 1', 'link2', '/image', 2, 1),
    ('Favorite3', 'Super favorite 1', 'link3', '/image', 3, 2),
    ('Favorite4', 'Super favorite 1', 'link4', '/image', 4, 2),
    ('Favorite5', 'Super favorite 1', 'link5', '/image', 1, 1),
    ('Favorite6', 'Super favorite 1', 'link6', '/image', 2, 2);

INSERT INTO "Token"("expiration", "userId", "emailToken", "jwtRefreshToken")

VALUES
    (1000, 1, '20000', '/JXRvAA01KsLYdQN7Gz+zOwfolcpJT8U0X5Xqh2iBz8ZBNokoJIxGfp0kVZ2np8FX3PXfQMlHb1/CPGtpW50s4vl8fmPdLY='),
    (1000, 2, '3000', 'ddZGNBR2ZkSJlzGlSX2fhM3HaLQlCvcRmiWQZ20ISvZ5Vw8M2PAaHMA7gWYfsSwiZ0C0UM1JQycD/JXRvAA01KsLYdQN7Gz+zOwfolcpJT8U0X5Xqh2iBz8ZBNokoJIxGfp0kVZ2np8FX3PXfQMlHb1/CPGtpW50s4vl8fmPdLY='),
    (1000, 3, '40000', 'ddZGNBR2ZkSJlzGlSX2fhM3HaLQlCvcRmiWQZ20ISvZ5Vw8M2PAaHMA7gWYfsSwiZ0C0UM1JQycD/JXRvAA01KsLYdQN7Gz+zOwfolcpJT8U0X5Xqh2iBz8ZBNokoJIxGfp0kVZ2np8FX3PXfQMlHb1/CPGtpW50s4vl8fmPdLY='),
    (1000, 4, '50000', 'ddZGNBR2ZkSJlzGlSX2fhM3HaLQlCvcRmiWQZ20ISvZ5Vw8M2PAaHMA7gWYfsSwiZ0C0UM1JQycD/JXRvAA01KsLYdQN7Gz+zOwfolcpJT8U0X5Xqh2iBz8ZBNokoJIxGfp0kVZ2np8FX3PXfQMlHb1/CPGtpW50s4vl8fmPdLY='),
    (1000, 5, '60000', 'ddZGNBR2ZkSJlzGlSX2fhM3HaLQlCvcRmiWQZ20ISvZ5Vw8M2PAaHMA7gWYfsSwiZ0C0UM1JQycD/JXRvAA01KsLYdQN7Gz+zOwfolcpJT8U0X5Xqh2iBz8ZBNokoJIxGfp0kVZ2np8FX3PXfQMlHb1/CPGtpW50s4vl8fmPdLY=');


INSERT INTO "ToolsOnUsers" ("userId", "toolId")

VALUES
    (1, 2),
    (2, 1),
    (3, 3);

COMMIT;
