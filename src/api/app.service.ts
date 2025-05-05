import { join } from "path";
import morgan from "morgan";
import * as express from "express";
import { config } from "src/config";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { logger } from "../infrastructure/lib/logger";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "../infrastructure/lib/filter/all.exception.filter";

export default class Application {
	public static async main(): Promise<void> {
		let app = await NestFactory.create(AppModule);
		app.useGlobalFilters(new AllExceptionsFilter());
		app.enableCors({
			origin: "*",
		});

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			}),
		);
		app.setGlobalPrefix("api");
		app.use("/images", express.static(join(__dirname, "../../../uploads")));
		app.use(
			morgan(function (tokens, req, res): any {
				logger.info({
					correlationId: req.headers["x-correlation-id"],
					method: tokens.method(req, res),
					url: tokens.url(req, res),
					status: tokens.status(req, res),
					contentLength: tokens.res(req, res, "content-length"),
					responseTime: tokens["response-time"](req, res),
					remoteAddr: tokens["remote-addr"](req, res),
					userAgent: tokens["user-agent"](req, res),
					httpVersion: tokens["http-version"](req, res),
					totalTime: tokens["total-time"](req, res),
				});
			}),
		);

		await app.listen(config.PORT, () => {
			logger.info(`Server running on  ${config.PORT} port`);
		});
	}
}
