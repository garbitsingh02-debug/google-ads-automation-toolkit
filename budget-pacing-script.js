function main() {
  var campaigns = AdsApp.campaigns()
    .withCondition("Status = ENABLED")
    .get();
  var targetSpend = 1000; // daily target (edit this)
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    var stats = campaign.getStatsFor("TODAY");
    var cost = stats.getCost();
    if (cost > targetSpend) {
      var currentBudget = campaign.getBudget().getAmount();
      var newBudget = currentBudget * 0.9;

      campaign.getBudget().setAmount(newBudget);
      Logger.log("Reduced budget for " + campaign.getName());
    }
  }
}
