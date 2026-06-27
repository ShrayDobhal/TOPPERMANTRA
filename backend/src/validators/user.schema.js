const { z } = require('zod');

const onboardingSchema = z.object({
  college: z.string().optional(),
  university: z.string().optional(),
  branch: z.string().optional(),
  year: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  careerGoal: z.string().optional(),
  skills: z.array(z.string()).max(5).optional(),
  interests: z.array(z.string()).optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
});

const profileUpdateSchema = onboardingSchema.extend({
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().max(500).optional()
});

module.exports = {
  onboardingSchema,
  profileUpdateSchema
};
