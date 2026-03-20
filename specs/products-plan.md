# Products Feature Test Plan

## Application Overview

The Products feature is the core functionality of the Automation Exercise website. It allows users to browse, search, filter, and view detailed information about products. The feature includes a product listing page with search and filtering capabilities (by category and brand), and individual product detail pages where users can view complete product information and add items to their cart.

## Test Scenarios

### 1. Products Page - Display and Navigationm

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify products page loads with all products displayed

**File:** `specs/tests/products/display.spec.ts`

**Steps:**
  1. Navigate to the Products page by clicking the Products link in the navigation menu
    - expect: The Products page loads successfully
    - expect: The page title is 'Automation Exercise - All Products'
    - expect: The 'All Products' heading is displayed
    - expect: Multiple product cards are visible with product images, names, and prices
  2. Verify the layout includes the product list and sidebar filters
    - expect: The left sidebar displays 'Category' section with Women, Men, Kids options
    - expect: The 'Brands' section is visible below Categories
    - expect: The main content area displays product grid with items

#### 1.2. Verify all product information is correctly displayed

**File:** `specs/tests/products/display.spec.ts`

**Steps:**
  1. On the Products page, examine the first few product cards
    - expect: Each product card displays a product image
    - expect: Each product shows a price in 'Rs.' currency format
    - expect: Each product displays its name/title
    - expect: An 'Add to cart' button is visible on each product
    - expect: A 'View Product' link is present for each product

#### 1.3. Verify navigation breadcrumb on filtered pages

**File:** `specs/tests/products/display.spec.ts`

**Steps:**
  1. Navigate to Products page, expand Women category, and click on Tops subcategory
    - expect: The filtered products page loads
    - expect: Breadcrumb shows 'Products > Women > Tops'
    - expect: Page title updates to 'Automation Exercise - Tops Products'
    - expect: Only Tops products are displayed

### 2. Products Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search for products by keyword

**File:** `specs/tests/products/search.spec.ts`

**Steps:**
  1. On the Products page, locate the search box at the top of the page
    - expect: Search textbox is visible with placeholder 'Search Product'
    - expect: Search button (magnifying glass icon) is visible next to the search box
  2. Type 'Top' in the search box and click the search button
    - expect: The page navigates to search results
    - expect: URL changes to include 'search=Top' parameter
    - expect: Heading changes to 'Searched Products'
    - expect: Only products containing 'Top' in their name are displayed

#### 2.2. Search for non-existent product

**File:** `specs/tests/products/search.spec.ts`

**Steps:**
  1. Search for a product name that doesn't exist (e.g., 'XYZ123NonExistent')
    - expect: The search results page loads
    - expect: No products are displayed
    - expect: A message indicating no products found is shown (or empty results area)

#### 2.3. Search with special characters and numbers

**File:** `specs/tests/products/search.spec.ts`

**Steps:**
  1. Search for product using numbers and special characters (e.g., '500', '@')
    - expect: Search function processes the input
    - expect: Results are displayed if matches exist
    - expect: Page handles special characters gracefully without errors

#### 2.4. Search with empty search box

**File:** `specs/tests/products/search.spec.ts`

**Steps:**
  1. Leave the search box empty and click the search button
    - expect: Either displays all products or shows an empty search message
    - expect: No error messages appear
    - expect: Page remains functional

### 3. Products Category Filtering

**Seed:** `tests/seed.spec.ts`

#### 3.1. Filter products by category - Women

**File:** `specs/tests/products/filtering.spec.ts`

**Steps:**
  1. On Products page, expand the 'Women' category in the sidebar
    - expect: Women category expands to show subcategories
    - expect: Subcategories appear: Dress, Tops, Saree
  2. Click on 'Dress' subcategory
    - expect: Page navigates to Women > Dress filtered results
    - expect: URL changes to '/category_products/1'
    - expect: Breadcrumb displays 'Products > Women > Dress'
    - expect: Only Dress products are shown

#### 3.2. Filter products by category - Men

**File:** `specs/tests/products/filtering.spec.ts`

**Steps:**
  1. On Products page, expand the 'Men' category in the sidebar
    - expect: Men category expands to show available subcategories
  2. Click on a Men subcategory (e.g., Tshirts)
    - expect: Filtered products page loads
    - expect: Breadcrumb shows 'Products > Men > [subcategory]'
    - expect: Only men's products in selected category are displayed

#### 3.3. Filter products by category - Kids

**File:** `specs/tests/products/filtering.spec.ts`

**Steps:**
  1. On Products page, expand the 'Kids' category in the sidebar
    - expect: Kids category expands to show available subcategories
  2. Click on a Kids subcategory
    - expect: Filtered products page loads
    - expect: Only kids' products in selected category are displayed
    - expect: Breadcrumb correctly shows the selected path

### 4. Products Brand Filtering

**Seed:** `tests/seed.spec.ts`

#### 4.1. Filter products by brand

**File:** `specs/tests/products/brand-filtering.spec.ts`

**Steps:**
  1. On Products page, locate the Brands section in the sidebar
    - expect: Brands section displays multiple brands
    - expect: Each brand shows the count of products in parentheses
    - expect: Brands include: Polo (6), H&M (5), Madame (5), Mast & Harbour (3), Babyhug (4), etc.
  2. Click on 'Polo' brand to filter by that brand
    - expect: Page navigates to brand-filtered results
    - expect: URL changes to '/brand_products/Polo'
    - expect: Only Polo brand products are displayed

#### 4.2. Filter by different brands

**File:** `specs/tests/products/brand-filtering.spec.ts`

**Steps:**
  1. Click on 'H&M' brand in the brands list
    - expect: Results update to show only H&M products
    - expect: Product count matches the brand's product count (5)
  2. Click on 'Babyhug' brand
    - expect: Results update to show only Babyhug products
    - expect: Product count matches Babyhug's count (4)

#### 4.3. Verify brand product counts are accurate

**File:** `specs/tests/products/brand-filtering.spec.ts`

**Steps:**
  1. For each brand in the Brands list, click on it and count the displayed products
    - expect: The number of products displayed matches the count shown in parentheses next to the brand name
    - expect: For example, clicking Polo shows exactly 6 products
    - expect: Clicking H&M shows exactly 5 products

### 5. Product Details Page

**Seed:** `tests/seed.spec.ts`

#### 5.1. View product details from products list

**File:** `specs/tests/products/product-details.spec.ts`

**Steps:**
  1. On Products page, click on 'View Product' link for first product (Blue Top)
    - expect: Product details page loads
    - expect: URL changes to '/product_details/1'
    - expect: Page title is 'Automation Exercise - Product Details'
    - expect: Product information is displayed

#### 5.2. Verify product details page displays all required information

**File:** `specs/tests/products/product-details.spec.ts`

**Steps:**
  1. On a product details page, verify all product information is displayed
    - expect: Product image is displayed prominently
    - expect: Product name (e.g., 'Blue Top') is shown
    - expect: Category breadcrumb displays correctly (e.g., 'Women > Tops')
    - expect: Price is shown in Rs. currency (e.g., 'Rs. 500')
    - expect: Availability status is displayed (e.g., 'In Stock')
    - expect: Product condition is shown (e.g., 'New')
    - expect: Brand information is displayed (e.g., 'Brand: Polo')

#### 5.3. Verify quantity selector on product details

**File:** `specs/tests/products/product-details.spec.ts`

**Steps:**
  1. On product details page, locate the quantity selector
    - expect: Quantity spinbutton is visible with default value of 1
    - expect: Quantity field allows user to input or change quantity
  2. Modify the quantity value from 1 to 5
    - expect: Quantity updates to 5
    - expect: Add to cart button is still visible and functional

#### 5.4. Verify review section on product details

**File:** `specs/tests/products/product-details.spec.ts`

**Steps:**
  1. On product details page, scroll down to see review section
    - expect: 'Write Your Review' link or button is present
    - expect: User can navigate to review section from this link

#### 5.5. View different products to verify dynamic content

**File:** `specs/tests/products/product-details.spec.ts`

**Steps:**
  1. Navigate to product details for multiple different products (e.g., products 2, 3, 5)
    - expect: Each product details page displays correct and unique information for that product
    - expect: Product names, prices, categories, and brands are different for each product
    - expect: Images correspond to the correct product

### 6. Add to Cart from Products

**Seed:** `tests/seed.spec.ts`

#### 6.1. Add product to cart from product list

**File:** `specs/tests/products/add-to-cart.spec.ts`

**Steps:**
  1. On Products page, click 'Add to cart' button for the first product
    - expect: Product is added to cart
    - expect: Confirmation message appears or cart badge updates
    - expect: User can continue shopping or proceed to cart

#### 6.2. Add product to cart from product details page

**File:** `specs/tests/products/add-to-cart.spec.ts`

**Steps:**
  1. Navigate to a product details page and click 'Add to cart' button
    - expect: Product is added to cart with the selected quantity
    - expect: Confirmation message displays
    - expect: User can view cart or continue shopping

#### 6.3. Add product with custom quantity

**File:** `specs/tests/products/add-to-cart.spec.ts`

**Steps:**
  1. On product details page, change quantity to 3 and click 'Add to cart'
    - expect: Product is added with quantity 3
    - expect: Cart total reflects the correct quantity
    - expect: Confirmation message confirms the quantity added

#### 6.4. Add multiple different products to cart

**File:** `specs/tests/products/add-to-cart.spec.ts`

**Steps:**
  1. Add 2-3 different products to cart from the Products page
    - expect: All products are added successfully
    - expect: Cart badge or indicator shows updated count
    - expect: User can add items from both product list and details pages

### 7. Products Page - Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 7.1. Handle page load with no products available

**File:** `specs/tests/products/edge-cases.spec.ts`

**Steps:**
  1. Perform search with query that returns no results
    - expect: Page loads without errors
    - expect: Empty state is displayed gracefully
    - expect: Message indicates no products found or empty results shown

#### 7.2. Verify page responsiveness and layout integrity

**File:** `specs/tests/products/edge-cases.spec.ts`

**Steps:**
  1. Navigate through multiple product pages and categories
    - expect: Page layout remains consistent
    - expect: Sidebar filters remain in place
    - expect: Product grid displays properly
    - expect: No layout shifting or broken elements

#### 7.3. Test product filtering combinations

**File:** `specs/tests/products/edge-cases.spec.ts`

**Steps:**
  1. Filter products by category, then search within filtered results
    - expect: Filtering and searching work together correctly
    - expect: Results reflect both filters applied
    - expect: User can clear filters to reset view

#### 7.4. Verify product price display consistency

**File:** `specs/tests/products/edge-cases.spec.ts`

**Steps:**
  1. Compare product prices shown on product list vs product details page for the same product
    - expect: Prices are consistent and match exactly
    - expect: Currency format is consistent (Rs. XXX)
    - expect: No price discrepancies between views

#### 7.5. Test navigation between products

**File:** `specs/tests/products/edge-cases.spec.ts`

**Steps:**
  1. Open product details, navigate back to products page, open a different product
    - expect: Navigation works without errors
    - expect: Product information updates correctly
    - expect: Back button and breadcrumb navigation work as expected
