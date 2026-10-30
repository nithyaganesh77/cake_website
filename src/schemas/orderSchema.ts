import { z } from 'zod';

// Indian phone number regex: accepts optional +91, 91, or bare 10 digits starting with 6, 7, 8, 9
const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

// Indian pincode regex: 6 digits, cannot start with 0
const indianPincodeRegex = /^[1-9][0-9]{5}$/;

export const checkoutFormSchema = z.object({
  customer_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name cannot exceed 80 characters'),
  customer_phone: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210)'),
  customer_email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  delivery_method: z.enum(['delivery', 'pickup']),
  delivery_address: z.string().optional(),
  delivery_pincode: z.string().optional(),
  delivery_landmark: z.string().max(100).optional(),
  scheduled_date: z.string().min(1, 'Please select your preferred celebration date'),
  scheduled_slot_id: z.string().min(1, 'Please select a preferred fulfillment time slot'),
  payment_method_preference: z.enum(['upi', 'bank_transfer', 'cash_on_delivery', 'cash_on_pickup']),
  special_instructions: z.string().max(500, 'Instructions cannot exceed 500 characters').optional(),
}).superRefine((data, ctx) => {
  if (data.delivery_method === 'delivery') {
    if (!data.delivery_address || data.delivery_address.trim().length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['delivery_address'],
        message: 'Delivery address is required (at least 8 characters with street/area details)',
      });
    }
    if (!data.delivery_pincode || !indianPincodeRegex.test(data.delivery_pincode.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['delivery_pincode'],
        message: 'Please provide a valid 6-digit Coimbatore delivery pincode (e.g. 641023)',
      });
    }
  }
});

export const customCakeRequestSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  customer_phone: z.string().regex(indianPhoneRegex, 'Valid 10-digit phone number is required'),
  customer_email: z.string().email('Valid email is required').optional().or(z.literal('')),
  cake_type: z.string().min(1, 'Please select cake type'),
  flavor: z.string().min(1, 'Please select cake flavor'),
  size_or_servings: z.string().min(1, 'Please select cake size / number of servings'),
  theme_or_occasion: z.string().min(2, 'Please specify the theme or occasion (e.g. 1st Birthday, Elegant Golden 50th)'),
  color_palette: z.string().min(2, 'Please indicate preferred colors (e.g. Blush Pink & Gold, Chocolate Brown & Cream)'),
  message_on_cake: z.string().max(40, 'Message cannot exceed 40 characters').optional(),
  required_date: z.string().min(1, 'Please select the required delivery/pickup date'),
  delivery_method: z.enum(['delivery', 'pickup']),
  additional_notes: z.string().max(800).optional(),
  estimated_budget: z.string().optional(),
});

export const bulkOrderRequestSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  customer_phone: z.string().regex(indianPhoneRegex, 'Valid phone number is required'),
  customer_email: z.string().email('Valid email address is required'),
  event_type: z.enum(['wedding', 'corporate', 'birthday', 'return_gifts', 'celebration', 'other']),
  event_date: z.string().min(1, 'Please select event date'),
  estimated_quantity: z.string().min(1, 'Please provide estimated guest count or box quantity'),
  product_requirements: z.string().min(10, 'Please describe your requirements (at least 10 characters)'),
  budget_range: z.string().optional(),
  delivery_location: z.string().min(3, 'Delivery area/venue is required'),
  additional_notes: z.string().max(800).optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type CustomCakeFormData = z.infer<typeof customCakeRequestSchema>;
export type BulkOrderFormData = z.infer<typeof bulkOrderRequestSchema>;

