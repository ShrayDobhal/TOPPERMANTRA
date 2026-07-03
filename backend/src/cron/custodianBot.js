const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// The Custodian Bot runs daily at midnight to enforce the "Parallel IIT" rules.
const initCustodianBot = () => {
  console.log('🤖 Custodian Bot initialized and waiting for schedule...');

  cron.schedule('0 0 * * *', async () => {
    console.log('🤖 Custodian Bot starting daily scan...');
    try {
      const today = new Date();
      
      // 1. Check Subpart Deadlines (Flags at risk tasks)
      const atRiskSubparts = await prisma.projectSubpart.findMany({
        where: {
          status: 'claimed',
          dueDate: {
            lte: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000) // within 48 hours
          }
        }
      });
      console.log(`Found ${atRiskSubparts.length} at-risk subparts.`);

      // 2. Check User Streaks (Reset streaks if no activity for > 2 days)
      const inactiveUsers = await prisma.user.findMany({
        where: {
          lastActivityAt: {
            lt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
          },
          streak: { gt: 0 }
        }
      });

      for (const user of inactiveUsers) {
        await prisma.user.update({
          where: { id: user.id },
          data: { streak: 0 }
        });
        console.log(`Reset streak for user ${user.id} due to inactivity.`);
      }

      // 3. Cohort Freezes (Flag users with 0 contribution in the week)
      // This logic can be extended as per PRD "3 Strikes = Out"

      console.log('🤖 Custodian Bot scan completed successfully.');
    } catch (error) {
      console.error('🤖 Custodian Bot encountered an error:', error);
    }
  });
};

module.exports = initCustodianBot;
