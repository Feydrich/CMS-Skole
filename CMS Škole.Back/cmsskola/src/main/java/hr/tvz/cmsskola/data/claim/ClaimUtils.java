package hr.tvz.cmsskola.data.claim;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ClaimUtils {
  public static String extractAuthority(Claim claim) {
    return claim.getOperation() + "-" + claim.getLevel().name() + "-" + getAction(claim);
  }

  private static String getAction(Claim claim) {
    // TODO postaviti Wid ili Cid
    if (claim.getAction() != null) {
      return claim.getAction().name();
    }
    return "";
  }

  public enum Operation {
    C,
    R,
    U,
    D
  }

  public enum Level {
    ALL,
    SELF
  }

  public enum Action {
    ROLE,
    USER,
    PAGE,
    CATEGORY
  }
}
