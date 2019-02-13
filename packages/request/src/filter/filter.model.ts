/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */

/**
 * Filter request options
 */
export class FilterOptions<R> {
  public readonly relations?: string[];
  public readonly select: (keyof R)[];
}
