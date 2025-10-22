/**
 * 对象池工具类
 * 用于优化频繁创建和销毁的小对象的内存占用
 */

export interface PoolableObject {
  /**
   * 重置对象状态
   */
  reset?(): void;
}

export interface ObjectPoolOptions<T> {
  /**
   * 创建新对象的工厂函数
   */
  create: () => T;

  /**
   * 重置对象的函数
   */
  reset?: (obj: T) => void;

  /**
   * 初始池大小
   */
  initialSize?: number;

  /**
   * 最大池大小
   */
  maxSize?: number;
}

export class ObjectPool<T extends PoolableObject | any> {
  private pool: T[] = [];
  private options: Required<ObjectPoolOptions<T>>;

  constructor(options: ObjectPoolOptions<T>) {
    this.options = {
      reset: options.reset || ((obj: T) => {
        if (typeof obj.reset === 'function') {
          obj.reset();
        }
      }),
      initialSize: options.initialSize || 0,
      maxSize: options.maxSize || 100,
      ...options,
    };

    // 预创建对象
    for (let i = 0; i < this.options.initialSize; i++) {
      this.pool.push(this.options.create());
    }
  }

  /**
   * 从池中获取对象
   */
  public acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.options.create();
  }

  /**
   * 将对象归还到池中
   */
  public release(obj: T): void {
    if (this.pool.length < this.options.maxSize) {
      this.options.reset(obj);
      this.pool.push(obj);
    }
  }

  /**
   * 批量释放对象
   */
  public releaseAll(objects: T[]): void {
    objects.forEach(obj => this.release(obj));
  }

  /**
   * 清空池
   */
  public clear(): void {
    this.pool = [];
  }

  /**
   * 获取池中对象数量
   */
  public get size(): number {
    return this.pool.length;
  }
}

/**
 * 创建对象池
 */
export function createObjectPool<T extends PoolableObject | any>(
  options: ObjectPoolOptions<T>
): ObjectPool<T> {
  return new ObjectPool(options);
}

/**
 * 全局对象池管理器
 */
class ObjectPoolManager {
  private pools: Map<string, ObjectPool<any>> = new Map();

  /**
   * 注册对象池
   */
  public register<T>(name: string, options: ObjectPoolOptions<T>): ObjectPool<T> {
    const pool = new ObjectPool(options);
    this.pools.set(name, pool);
    return pool;
  }

  /**
   * 获取对象池
   */
  public get<T>(name: string): ObjectPool<T> | undefined {
    return this.pools.get(name);
  }

  /**
   * 移除对象池
   */
  public unregister(name: string): void {
    const pool = this.pools.get(name);
    if (pool) {
      pool.clear();
      this.pools.delete(name);
    }
  }

  /**
   * 清空所有对象池
   */
  public clearAll(): void {
    this.pools.forEach(pool => pool.clear());
    this.pools.clear();
  }
}

// 全局单例
export const poolManager = new ObjectPoolManager();




