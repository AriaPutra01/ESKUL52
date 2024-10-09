/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AlertMessage from "./AlertMessage";
import { logout } from "@/lib/actions";

const DataEskul: { title: string; href: string; description: string }[] = [
	{
		title: "Tambah Eskul",
		href: "/Home/Eskul/Tambah",
		description: "Halaman untuk membuat data Eskul.",
	},
	{
		title: "List Eskul",
		href: "/Home/Eskul",
		description: "Halaman pengelolaan data Eskul.",
	},
];

const DataUser: { title: string; href: string; description: string }[] = [
	{
		title: "Tambah Pengguna",
		href: "/Home/User/Tambah",
		description: "Halaman untuk membuat data Pengguna.",
	},
	{
		title: "List Pengguna",
		href: "/Home/User",
		description: "Halaman pengelolaan data Pengguna.",
	},
];

export function NavigationBar({ session }: { session: any }) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{!session && (
					<>
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/Eskul" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Eskul
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/Login" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Login
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</>
				)}
				{session && session.user.role === "admin" && (
					<>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Data Eskul</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
									{DataEskul.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Data User</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
									{DataUser.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>
								Hello {session.user.name}
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
									<ListItem title="Profile" href="/Home/User/Detail">
										Halaman profile pengguna.
									</ListItem>
									<AlertMessage
										action={() => logout()}
										message="Anda akan melakukan logout!">
										<ListNoLink title="Logout">Aksi untuk Logout</ListNoLink>
									</AlertMessage>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

const ListNoLink = ({
	className,
	title,
	children,
	...props
}: {
	className?: string;
	title?: string;
	children?: React.ReactNode;
}) => {
	return (
		<li>
			<div
				className={cn(
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					className
				)}
				{...props}>
				<div className="text-sm font-medium leading-none">{title}</div>
				<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
					{children}
				</p>
			</div>
		</li>
	);
};
ListNoLink.displayName = "ListNoLink";
