/**
 * @author dweexfuad
 */
window.app_assetsap_dashboard_fLapViewAlt = function(owner,options, callObj, proc)
{
    if (owner)
    {	
		try{
	        window.app_assetsap_dashboard_fLapViewAlt.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboard_fLapViewAlt";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("pageControl",true);
			this.tab = new pageControl(this,{bound:[10,0,this.width - 30, this.height - 70], childPage:["Konversi","Verifikasi","Kesimpulan"]});
			this.sg1 = new saiGrid(this.tab.childPage[0], {
				bound: [1, 0, this.tab.width - 4, this.tab.height - 50],
				colCount: 12,
				readOnly: true,
				colTitle: ["No Konversi","Tgl Konversi","No Gabung", "Alamat","Jumlah Fisik","No Label","Status","Ket. Status","Sertifikat/IMB/PBB/DLL","Luas","Dekripsi Lokasi","Keterangan"],
				colWidth: [[11,10,9,8,7,6,5,4,3,2, 1, 0], [250,200,100,150,150,100,100,150,100,100,100,130]],				
				click: [this, "doSgBtnClick"],
				colAlign: [[2], [alCenter]]
			});
			this.sgn1 = new sgNavigator(this.tab.childPage[0], {
				bound: [1, this.tab.height - 40, this.sg1.width, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				beforePrint: [this, "doBeforePrintSg2"],
				grid: this.sg1
			});
			this.sg2 = new saiGrid(this.tab.childPage[1], {
				bound: [1, 0, this.tab.width - 4, this.tab.height - 50],
				colCount: 14,
				readOnly: true,
				colTitle: ["No Rekonsiliasi", "Tanggal", "No Gabung", "Info. KKIL = KKP?","Aset Tercatat","Selisih","Penjelasan Selisih","Tindak Lanjut","Update Deskrispi Aset","Update Alamat","Update BA","Status Final","Cara Verifikasi","Tindak lanjut final"],
				colWidth: [[13,12,11,10,9,8,7,6,5,4,3,2, 1, 0], [100,100,100,100,250,150,150, 150,100,100,100,100,100,130]],				
				click: [this, "doSgBtnClick"],
				colAlign: [[2], [alCenter]]
			});
			this.sgn2 = new sgNavigator(this.tab.childPage[1], {
				bound: [1, this.tab.height - 40, this.sg1.width, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				beforePrint: [this, "doBeforePrintSg2"],
				grid: this.sg2
			});	
			this.sg3 = new saiGrid(this.tab.childPage[2], {
				bound: [1, 0, this.tab.width - 4, this.tab.height - 50],
				colCount: 14,
				readOnly: true,
				colTitle: ["No Rekonsiliasi", "Tanggal", "No Gabung", "Info. KKIL = KKP?","Aset Tercatat","Selisih","Penjelasan Selisih","Tindak Lanjut","Update Deskrispi Aset","Update Alamat","Update BA","Status Final","Cara Verifikasi","Tindak lanjut final"],
				colWidth: [[13,12,11,10,9,8,7,6,5,4,3,2, 1, 0], [100,100,100,100,250,150,150, 150,100,100,100,100,100,130]],				
				click: [this, "doSgBtnClick"],
				colAlign: [[2], [alCenter]]
			});
			this.sgn3 = new sgNavigator(this.tab.childPage[1], {
				bound: [1, this.tab.height - 40, this.sg1.width, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				beforePrint: [this, "doBeforePrintSg2"],
				grid: this.sg3
			});				
			this.getField(proc);
			this.getField2(proc);
			this.bClose = new imageButton(this,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboard_fLapViewAlt.extend(window.childForm);
window.app_assetsap_dashboard_fLapViewAlt.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){		
		var sql = new server_util_arrayList();
		
		sql.add("select a.no_fa, a.no_sn, "+this.gridColumn.dbField +
					" from amu_asset a inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung "+
					"where a.no_gabung = '"+value+"'  ");
		sql.add("select a.no_fa, a.no_sn, "+this.gridColumn2.dbField +
					"	from amu_asset a "+
					" inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung "+
					" inner join amu_alt_ver_d  c on c.no_gabung = a.no_gabung "+					
					" left outer join amu_alt_baver_d  d on d.no_gabung = a.no_gabung "+					
					"where a.no_gabung = '"+value+"'  ");
		sql.add("select a.no_fa, a.no_sn, "+this.gridColumn2.dbField +", d.kesimpulan "+
					"	from amu_asset a "+
					" inner join amu_alt_konv_d b on b.no_gabung = a.no_gabung "+
					" inner join amu_alt_ver_d c on c.no_gabung = a.no_gabung "+					
					" inner join amu_alt_baver_d  d on d.no_gabung = a.no_gabung "+					
					"where a.no_gabung = '"+value+"'  ");		
		var result = this.dbLib.getMultiDataProvider(sql,true);
		if (typeof result != "string"){
			var line,data= [];
			this.sg1.clear();
			
			for (var i in result.result[0].rs.rows){
				line = result.result[0].rs.rows[i];				
				data = [line["no_fa"]+line["no_sn"]];
				for (var c in line) data[data.length] = line[c];
				this.sg1.appendData(data);
			}
			this.sg2.clear();
			for (var i in result.result[1].rs.rows){
				line = result.result[1].rs.rows[i];				
				data = [line["no_fa"]+line["no_sn"]];
				for (var c in line) data[data.length] = line[c];
				this.sg2.appendData(data);
			}				
			this.sg3.clear();
			for (var i in result.result[2].rs.rows){
				line = result.result[2].rs.rows[i];
				data = [line["no_fa"]+line["no_sn"]];
				for (var c in line) data[data.length] = line[c];
				this.sg3.appendData(data);
			}
		}else alert(data);
	},
	setPanelCaption: function(data){		
	},
	getField: function(proc){
		try{			
			this.gridColumn = {};
			switch (trim(proc)){
				case "Sentral":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral, Status";
					this.gridColumn.dbField = "kode_netre, kode_arnet, lokasi_sentral, kode_sentral, nama_sentral, kode_area, fkn, fungsi, host, tipe_sentral, status_app";
					this.gridColumn.dbTable = "amu_lokasi,amu_lokasi,amu_sentral";													
					this.colWidth = [80,100,100,100,100,100,100, 100, 100, 80, 80, 50, 150,150];
				break;
				case "RCE & MUX":
				case "RMS":
				case "SKKL / SKSO":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status";
					this.gridColumn.dbField = "kode_lok, kode_tipe, kode_komp, kode_proyek, kode_link, status_app";
					this.gridColumn.dbTable = "amu_lok,amu_tipe, amu_komp, amu_proyek, amu_link";					
					this.colWidth = [80,100, 100, 100, 80, 80, 50, 150,150];
				break;
				case "Modem Data & IMUX":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status";
					this.gridColumn.dbField = "no_kontrak, kode_vendor, no_kontrak2, status_sn", status_app;
					this.gridColumn.dbTable = "amu_kontrak, amu_vendor, amu_kontrak";					
					this.colWidth = [80,80, 100, 80, 80, 50, 150,150];
				break;
				case "Satelit":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Nama Satelit, Status";
					this.gridColumn.dbField = "kode_satelit, status_app";
					this.gridColumn.dbTable = "amu_satelit";					
					this.colWidth = [80, 80, 50, 150,150];
				break;				
				case "Server":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Sub UBIS, Lokasi Aset/Perangkat, IP Perangkat,Nama Aplikasi/Tools, Tipe Switch, IP Switch";
					this.gridColumn.dbField = "kode_ubis, kode_sbis, kode_aplikasi, kode_jenisapl, kode_lok, status_app";				
					this.gridColumn.dbTable = "amu_ubis, amu_sbis, amu_aplikasi, amu_jenisapl, amu_lok";					
					this.colWidth = [80,100, 100, 100, 80, 80, 50, 150,150];
				break;				
				case "RBS":				
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status";
					this.gridColumn.dbField = "kode_lokrbs_m, kode_lokrbs_d, kode_lok, kode_regional,  kode_vendor, kode_alat, sts_rbs, status_app ";								
					this.gridColumn.dbTable = "amu_lokrbs_m, amu_lokrbs_d, amu_lok, amu_regional, amu_vendor, amu_alat";					
					this.colWidth = [80,100,100,100, 100, 100, 80, 80, 50, 150,150];
				break;				
				case "STM & IMS":				
				//
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan, Status";
					this.gridColumn.dbField = "kode_group, kode_klpstm, kode_klpfa, kode_merk, kode_vendor, kode_lokstm, kode_sto, jumlah, kode_satuan, keterangan, status_app  ";				
					this.gridColumn.dbTable = "amu_group, amu_klpstm, amu_klp, amu_merk, amu_vendor, amu_lokstm, amu_sto, -, amu_satuan,-";					
					this.colWidth =[80,100,100,100,100,100,100, 100, 100, 80, 80, 50, 150,150];
				break;				
				case "LAN & WAN":
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch";
					this.gridColumn.dbField = "kode_ubis, kode_sbis, kode_aplikasi, kode_jenisapl, kode_lok, status_app";				
					this.gridColumn.dbTable = "amu_ubis, amu_sbis, amu_aplikasi, amu_jenisapl, amu_lok";					
					this.colWidth = [80,100, 100, 100, 80, 80, 50, 150,150];
				break;
				case "Jaringan":	
				//	
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No,Regional, Area, STO, Status";
					this.gridColumn.dbField = "kode_regional, kode_area, kode_sto, status_app";				
					this.gridColumn.dbTable = "amu_regional, amu_area, amu_sto";				
					this.colWidth = [80,100, 80, 80, 50, 150,150];
				break;
				case "Tanah & Bangunan":								
					this.gridColumn.kolom = "No Gabung, No Aset, Sub.No, No Sertifikat, Lokasi Aset (Sertifikat), Luas Tanah, Luas Bangunan, Status Dokumen, NOP,Lokasi Aset(NOP), Luas Tanah, Luas Bangunan, NKA Link Bangunan, Status Dokumen, Jenis Dokumen, No, Lokasi Sesuai Dokumen, Pelanggan, NKA Link Tanah, Status Dokumen, Status";
					this.gridColumn.dbField = "no_sertifikat, status_sertifikat, no_pbb,  no_fapbb, status_pbb, jenis_dok, no_dok,  lokasi, no_cust, no_falain, status_dok, status_app";				
					this.gridColumn.dbTable = "amu_arsip,-,-,-,-,amu_arsip,-,-,-,amu_asset,-,-,amu_arsip,-,amu_cust,amu_asset,-";								
					this.colWidth =  [80,100, 80, 80, 50, 150,150];
				break;
			}		
			this.gridColumn.dbTable = this.gridColumn.dbTable.split(",");		
			var kolom = this.gridColumn.kolom.split(",");
			this.gridColumn.kolom = kolom;
			this.sg1.clear();
			this.sg1.setColCount(kolom.length);
			this.sg1.setColTitle(kolom);				
			var col = [];
			for (var i=kolom.length - 1; i >= 0; i--) col[col.length] = i;
			this.sg1.setColWidth(col, this.colWidth);								
			this.sg1.appendRow();
		}catch(e){
			alert(e);
		}
	},
	getField2: function(proc){
		try{		
			this.gridColumn2 = {};	
			switch (proc){
				case "Sentral":
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_netre, b.kode_arnet, b.lokasi_sentral, b.kode_sentral, b.nama_sentral, b.kode_area, b.fkn, b.fungsi, b.host, b.tipe_sentral, b.status_app, c.no_evd ";
					this.gridColumn2.dbFieldSQL = "nmlok,nmarnet,lokasi_sentral,kode_sentral,nmsentral,kode_area,fkn,fungsi,host,tipe_central,status_app,evd,no_konv";
					this.colWidth2 = [120,100,80,100,100,100,100,100,100, 100, 100, 80, 80, 50, 150,150];					
				break;
				case "RCE & MUX":
				case "RMS":
				case "SKKL / SKSO":
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_netre as nmlok, b.kode_tipe as nmtipe, b.kode_komp as nmkomp, b.kode_proyek as nmproyek, b.kode_link as nmlink";					
					this.gridColumn2.dbFieldSQL = "nmlok,nmtipe,nmkomp,nmproyek,nmlink,status_app,evd,no_konv";					
					this.colWidth2 = [100,80,100, 100, 100, 80, 80, 50, 150,150];					
				break;
				case "Modem Data & IMUX":		
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.no_kontrak, b.kode_vendor, b.no_kontrak2, b.status_sn";					
					this.gridColumn2.dbFieldSQL = "no_kontrak,kode_vendor,no_kontrak2,status_sn,status_app,evd,no_konv";					
					this.colWidth2 = [100,120,80,80, 100, 80, 80, 50, 150,150];
				break;
				case "Satelit":
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset,Nama Satelit, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_satelit";					
					this.gridColumn2.dbFieldSQL = "kode_satelit,status_app,evd,no_konv";					
					this.colWidth2 = [100,00,80, 80, 50, 150,150];	
				break;
				case "Server":				
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset,UBIS, SBIS, Nama Aplikasi/Tools, Jenis, Lokasi, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_netre,b.lokasi_server, b.ip_server, b.kode_aplikasi, b.tipe_switch, b.ip_switch";									
					this.gridColumn2.dbFieldSQL = "kode_netre, lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch,status_app,evd,no_konv";
					this.colWidth2 = [100,100,80,100, 100, 100, 80, 80, 50, 150,150];					
				break;
				case "RBS":				
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.level1, b.level2, b.lokasi_rbs, b.kode_sto, b.kode_vendor, b.kode_alat, b.sts_rbs";														
					this.gridColumn2.dbFieldSQL = "level1,level2,lokasi_rbs,kode_sto,kode_vendor,kode_alat,sts_rbs,status_app,evd,no_konv";
					this.colWidth2 = [100,80,100,100,100, 100, 100, 80, 80, 50, 150,150];
				break;			
				case "STM & IMS":			
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_group, b.kode_klpstm, b.kode_klpfa, b.kode_merk, b.kode_vendor, b.kode_lokstm, b.kode_sto, b.jumlah, b.kode_satuan, b.keterangan ";					
					this.gridColumn2.dbFieldSQL = "kode_group,kode_klpstm,kode_klpfa,kode_merk,kode_merk,kode_vendor, kode_lokstm, kode_sto, jumlah,keterangan,status_app,evd,no_konv";
					this.colWidth2 = [100,80,100,100,100,100,100,100, 100, 100, 80, 80, 50, 150,150];				
				break;
				case "LAN & WAN":
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_ubis, b.kode_sbis, b.kode_aplikasi, b.kode_jenisapl, b.kode_lok";					
					this.gridColumn2.dbFieldSQL = "kode_ubis,kode_sbis,kode_aplikasi,kode_jenisapl,kode_lok,status_app,evd,no_konv";
					this.colWidth2 = [120,100,80,100, 100, 100, 80, 80, 50, 150,150];					
				break;
				case "Jaringan":	
				//	
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Regional, Area, STO, Status, Ref. Evidence";
					this.gridColumn2.dbField = "b.kode_netre, b.kode_arnet, b.kode_sto";					
					this.colWidth2 =  [100,80,100, 80, 80, 50, 150,150];
					this.gridColumn2.dbFieldSQL = "kode_netre,kode_arnet,status_app,evd,no_konv";					
				break;
				case "Tanah & Bangunan":				
					this.gridColumn2.kolom = "No Gabung, No Aset, Sub.No,Alamat Asset, No Sertifikat, Lokasi Aset (Sertifikat), Luas Tanah, Luas Bangunan, Status Dokumen, NOP,Lokasi Aset(NOP), Luas Tanah, Luas Bangunan, NKA Link Bangunan, Status Dokumen, Jenis Dokumen, No, Lokasi Sesuai Dokumen, Pelanggan, NKA Link Tanah, Status Dokumen, Status, Ref. Evidence";
					this.gridColumn2.dbField = "c.no_surat, cc.alamat as alm_sertifikat,cc.tanah, cc.bangun as bgn,ccc.nama as status_sertifikat, "+
							" d.no_surat as no_nop,  dd.alamat as alm_pbb,dd.tanah as tnhpbb, dd.bangun as bgnpbb, b.no_fapbb, ddd.nama as status_pbb, "+
							" b.jenis_dok, f.no_surat as no_dok,  ff.alamat, g.nama as nmcust, b.no_falain, fff.nama as status_dok";				
					this.gridColumn2.dbTable = "";
					this.colWidth2 = [120,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80,100, 80, 80, 50, 150,150];
					this.gridColumn2.dbFieldSQL = "no_surat,alm_sertifikat,tanah,bgn,status_sertifikat,no_nop,alm_pbb,tnhpbb,bgnpbb,no_fapbb,status_pbb,jenis_dok,no_dok,alamat,nmcust,no_falain,status_dok,status_app,evd,no_konv";
				break;
			}					
			this.gridColumn2.dbFieldSQL = this.gridColumn2.dbFieldSQL.split(",");		
			var kolom = this.gridColumn2.kolom.split(",");
			this.gridColumn2.kolom = kolom;		
			this.sg2.clear();
			this.sg2.setColCount(kolom.length);
			this.sg2.setColTitle(kolom);		
			var col = [];
			for (var i= kolom.length - 1; i >= 0; i--) col[col.length] = i;
			this.sg2.setColWidth(col, this.colWidth2);			
			
			this.sg3.clear();			
			this.sg3.setColCount(kolom.length+1);
			kolom[kolom.length] = "Kesimpulan";
			this.colWidth2[this.colWidth2.length] = 100;
			this.sg3.setColTitle(kolom);		
			var col = [];
			for (var i= kolom.length - 1; i >= 0; i--) col[col.length] = i;
			this.sg3.setColWidth(col, this.colWidth2);			
		}catch(e){
			alert(e);
		}
	}
});
