/*
 * ClassName:       Vector2
 * Description:     A two dimensional vector object
 * Author:          Dave Inchy;
 * Updated:         2022-03-18
 * ------------------------------------------------- *\
 * @param {Number} x
 * @param {Number} y
 * @constructor {Vector2} (x, y)
 * ------------------------------------------------- */
export default class Vector2 {

    public readonly x: number;
    public readonly y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    public add(other: Vector2) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    public subtract = (other: Vector2) => {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    public multiply = (other: Vector2) => {
        return new Vector2(this.x * other.x, this.y * other.y);
    }

    public divide = (other: Vector2) => {
        return new Vector2(this.x / other.x, this.y / other.y);
    }
}