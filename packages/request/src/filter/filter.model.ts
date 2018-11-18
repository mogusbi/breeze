/**
 * @author Mo Gusbi <me@mogusbi.co.uk>
 */

/**
 * Filter request options
 */
export class FilterOptions<R> {
  public readonly select: (keyof R)[];
}
