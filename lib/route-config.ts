/**
 * Shared route segment configuration for dashboard pages
 * DRY principle: Import and spread this config instead of repeating it
 */
export const dashboardRouteConfig = {
  dynamic: 'force-dynamic' as const,
  revalidate: 0,
};

