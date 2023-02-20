-- CreateIndex
CREATE INDEX "favorite_link_idx" ON "favorite"("link");

-- CreateIndex
CREATE INDEX "favorite_link_img_idx" ON "favorite"("link_img");

-- CreateIndex
CREATE INDEX "favorite_name_idx" ON "favorite"("name");

-- CreateIndex
CREATE INDEX "tool_logo_idx" ON "tool"("logo");

-- CreateIndex
CREATE INDEX "tool_name_idx" ON "tool"("name");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_firstname_idx" ON "user"("firstname");

-- CreateIndex
CREATE INDEX "user_lastname_idx" ON "user"("lastname");