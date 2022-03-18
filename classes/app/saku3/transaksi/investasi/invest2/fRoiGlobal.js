window.app_saku3_transaksi_investasi_invest2_fRoiGlobal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fRoiGlobal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fRoiGlobal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data ROI Global / per Class Asset", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,text:"201701"});
		
		this.bHitAll = new button(this,{bound:[120,13,100,18],caption:"Hitung",click:[this,"doHitungAll"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["ROI CASH","ROI - SAHAM","ROI - EFEK","ROI PROPENSA","ROI BLENDED"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:9,
		            colTitle:["Tanggal","NABAwal","Masuk/Beli","Keluar/Jual","NABAkhir","Hasil Bruto","Pajak","Beban", "Hasil Netto", "ROI Harian","Hari n+1","Kumulatif",  "Modul"],
					colWidth:[[12,11,10,9,8,  7,6,5,4,3,2,1,0],[80, 80,80,80, 80,100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8, 9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:9,
		            colTitle:["Tanggal","NABAwal","Masuk/Beli","Keluar/Keluar","NABAkhir","Hasil Bruto","Pajak","Beban", "Hasil Netto", "ROI Harian","Hari n+1","Kumulatif",  "Modul"],
					colWidth:[[12,11,10,9,8,  7,6,5,4,3,2,1,0],[80, 80,80,80, 80,100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8, 9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.sg5 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:9,
		            colTitle:["Tanggal","NABAwal","Masuk/Beli","Keluar/Keluar","NABAkhir","Hasil Bruto","Pajak","Beban", "Hasil Netto", "ROI Harian","Hari n+1","Kumulatif",  "Modul"],
					colWidth:[[12,11,10,9,8,  7,6,5,4,3,2,1,0],[80, 80,80,80, 80,100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8, 9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});

		this.sg6 = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:9,
		            colTitle:["Tanggal","NABAwal","Masuk/Beli","Keluar/Keluar","NABAkhir","Hasil Bruto","Pajak","Beban", "Hasil Netto", "ROI Harian","Hari n+1","Kumulatif",  "Modul"],
					colWidth:[[12,11,10,9,8,  7,6,5,4,3,2,1,0],[80, 80,80,80, 80,100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8, 9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn6 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg6,pager:[this,"doPager6"]});

		this.sg7 = new saiGrid(this.pc2.childPage[4],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:13,tag:9,
		            colTitle:["Tanggal","NABAwal","Masuk/Beli","Keluar/Keluar","NABAkhir","Hasil Bruto","Pajak","Beban", "Hasil Netto", "ROI Harian","Hari n+1","Kumulatif",  "Modul"],
					colWidth:[[12,11,10,9,8,  7,6,5,4,3,2,1,0],[80, 80,80,80, 80,100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8, 9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn7 = new portalui_sgNavigator(this.pc2.childPage[4],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg7,pager:[this,"doPager7"]});

		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();

			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fRoiGlobal.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fRoiGlobal.implement({	
	doHitungAll: function(sender) {
		this.doHitungCash();
		this.doHitungSaham();
		this.doHitungEfek();
		this.doHitungPropensa();
		this.doHitungBlended();

		system.info(this,"Perhitungan selesai.","");
	},	
	doHitungCash: function(sender) {
		try {
			//jumlah hari dlm bulan
			this.sg3.clear();
			//this.pc2.setActivePage(this.pc2.childPage[0]);								
			
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			for (var i = 0; i < tglAkhir;i++){
				var k = i+1;
				var idx = k.toString();
				if (idx.length == 1) var nu = "0"+idx;
				if (idx.length == 2) var nu = idx;
	
				var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
				this.sg3.appendData([tgl,"0","0","0","0","0","0","0","0",  "0","0","0", "CASH"]);						
			}
			

			var strSQL = "select modul,tanggal "+
				",sum(sawal) as sawal "+
				",sum(masuk) as masuk "+
				",sum(keluar) as keluar "+
				",sum(sakhir) as sakhir "+
				",sum(bunga) as bunga "+
				",sum(pajak) as pajak "+
				",sum(beban) as beban "+
				",sum(bunga_net) as bunga_net "+
				"from "+
				"( "+

				"select 'CASH' as modul,tanggal "+
				",sawal "+
				",masuk "+
				",keluar "+
				",sakhir "+
				",bunga "+
				",pajak "+
				",beban "+
				",bunga_net "+
				"from inv_depo_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and status_dana ='DAKES' "+

				"union all "+

				"select 'CASH' as modul,tanggal "+
				",nab_awal "+
				",beli "+
				",jual "+
				",nab_akhir "+
				",hasil_gross "+
				",nilai_pajak "+
				",jml_beban "+
				",hasil_net "+
				"from inv_rd_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and kode_rdklp='RDPU' "+

				"union all "+

				"select 'CASH' as modul,tanggal "+
				",0 as nab_awal "+
				",0 as beli "+
				",0 as jual "+
				",0 as nab_akhir "+
				",0 as hasil_gross "+
				",0 as nilai_pajak "+
				",nilai_ja+nilai_nonja as jml_beban "+
				",0 as hasil_net "+
				"from inv_roi_beban "+ 
				"where periode ='"+this.e_periode.getText()+"' and kelas='CASH' "+

				") a "+

				"group by a.modul,a.tanggal "+
				"order by a.modul,a.tanggal ";

			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNAB = data;
				var line;
				for (var i=0;i < this.dataNAB.rs.rows.length;i++){
					line = this.dataNAB.rs.rows[i];	
					for (var j=0;j < this.sg3.getRowCount();j++){
						if (line.modul = this.sg3.cells(12,j) && line.tanggal == this.sg3.cells(0,j)) {
							this.sg3.cells(1,j,parseFloat(line.sawal));
							this.sg3.cells(2,j,parseFloat(line.masuk));
							this.sg3.cells(3,j,parseFloat(line.keluar));
							this.sg3.cells(4,j,parseFloat(line.sakhir));
							this.sg3.cells(5,j,parseFloat(line.bunga));
							this.sg3.cells(6,j,parseFloat(line.pajak));
							this.sg3.cells(7,j,parseFloat(line.beban));
							this.sg3.cells(8,j,parseFloat(line.bunga_net) - parseFloat(line.pajak) - parseFloat(line.beban));							
						}
					}					
				}									
			}	

			//============================================== HITUNG ROI ================================================
			for (var i=0;i < this.sg3.getRowCount();i++){
				//---> roi net = hasil_net / nab_awal
				if (nilaiToFloat(this.sg3.cells(1,i)) == 0) var roiHari = 0;
				else var roiHari = Math.round(nilaiToFloat(this.sg3.cells(8,i)) /  nilaiToFloat(this.sg3.cells(1,i)) * 10000) /10000;									
				this.sg3.cells(9,i,roiHari);

				//---> kinerja = roi + 1;
				this.sg3.cells(10,i,roiHari+1);
				
				//---> roi kumulatif = kinerja * roi_kum tgl sebeumnya
				if (i == 0) var roiKum = roiHari + 1;
				else {
					var roiKum = (roiHari+1) * nilaiToFloat(this.sg3.cells(11,i-1));
				}
				this.sg3.cells(11,i,roiKum);
			}
			
			//rumus product
			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {	
					if (this.sg3.cells(11,i) != "0") this.sg3.cells(11,i,nilaiToFloat(this.sg3.cells(11,i)) - 1);					
				}
			}
		
		}
		catch(e) {
			alert(e);
		}		
	},
	doHitungSaham: function(sender) {
		try {
			//jumlah hari dlm bulan
			this.sg4.clear();
			//this.pc2.setActivePage(this.pc2.childPage[1]);		
			
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			for (var i = 0; i < tglAkhir;i++){
				var k = i+1;
				var idx = k.toString();
				if (idx.length == 1) var nu = "0"+idx;
				if (idx.length == 2) var nu = idx;
	
				var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
				this.sg4.appendData([tgl,"0","0","0","0","0","0","0","0",  "0","0","0", "SHM"]);						
			}
			

			var strSQL = "select modul,tanggal "+
				",sum(sawal) as sawal "+
				",sum(masuk) as masuk "+
				",sum(keluar) as keluar "+
				",sum(sakhir) as sakhir "+
				",sum(bunga) as bunga "+
				",sum(pajak) as pajak "+
				",sum(beban) as beban "+
				",sum(bunga_net) as bunga_net "+
				"from "+
				"( "+

				"select 'SAHAM' as modul,tanggal "+
				",nab_awal as sawal "+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_saham_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' "+

				
				"union all "+

				"select 'SAHAM' as modul,tanggal "+
				",nab_awal as sawal"+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_rd_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and kode_rdklp in ('RDSH','RETF') "+

				"union all "+
				
				// 70% dari reksadana campuran masuk ke saham bursa
				"select 'SAHAM' as modul,tanggal "+
				",round(nab_awal * 0.7,0) as sawal "+
				",round(beli * 0.7,0) as masuk "+
				",round(jual * 0.7,0) as keluar "+
				",round(nab_akhir * 0.7,0) as sakhir "+
				",round(hasil_gross * 0.7,0) as bunga "+
				",round(nilai_pajak * 0.7,0) as pajak "+
				",round(jml_beban * 0.7,0) as beban "+
				",round(hasil_net * 0.7,0) as bunga_net "+
				"from inv_rd_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and kode_rdklp = 'RDCM' "+


				"union all "+

				"select 'SAHAM' as modul,tanggal "+
				",0 as nab_awal "+
				",0 as beli "+
				",0 as jual "+
				",0 as nab_akhir "+
				",0 as hasil_gross "+
				",0 as nilai_pajak "+
				",nilai_ja+nilai_nonja as jml_beban "+
				",0 as hasil_net "+
				"from inv_roi_beban "+ 
				"where periode ='"+this.e_periode.getText()+"' and kelas='SAHAM' "+

				") a "+

				"group by a.modul,a.tanggal "+
				"order by a.modul,a.tanggal ";

			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNAB = data;
				var line;
				for (var i=0;i < this.dataNAB.rs.rows.length;i++){
					line = this.dataNAB.rs.rows[i];	
					for (var j=0;j < this.sg4.getRowCount();j++){
						if (line.modul = this.sg4.cells(12,j) && line.tanggal == this.sg4.cells(0,j)) {
							this.sg4.cells(1,j,parseFloat(line.sawal));
							this.sg4.cells(2,j,parseFloat(line.masuk));
							this.sg4.cells(3,j,parseFloat(line.keluar));
							this.sg4.cells(4,j,parseFloat(line.sakhir));
							this.sg4.cells(5,j,parseFloat(line.bunga));
							this.sg4.cells(6,j,parseFloat(line.pajak));
							this.sg4.cells(7,j,parseFloat(line.beban));
							this.sg4.cells(8,j,parseFloat(line.bunga_net) - parseFloat(line.pajak) - parseFloat(line.beban));							
						}
					}					
				}									
			}	

			//============================================== HITUNG ROI ================================================
			for (var i=0;i < this.sg4.getRowCount();i++){
				//---> roi net = hasil_net / nab_awal
				if (nilaiToFloat(this.sg4.cells(1,i)) == 0) var roiHari = 0;
				else var roiHari = Math.round(nilaiToFloat(this.sg4.cells(8,i)) /  nilaiToFloat(this.sg4.cells(1,i)) * 10000) /10000;									
				this.sg4.cells(9,i,roiHari);

				//---> kinerja = roi + 1;
				this.sg4.cells(10,i,roiHari+1);
				
				//---> roi kumulatif = kinerja * roi_kum tgl sebeumnya
				if (i == 0) var roiKum = roiHari + 1;
				else {
					var roiKum = (roiHari+1) * nilaiToFloat(this.sg4.cells(11,i-1));
				}
				this.sg4.cells(11,i,roiKum);
			}
			
			//rumus product
			for (var i=0;i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i)) {	
					if (this.sg4.cells(11,i) != "0") this.sg4.cells(11,i,nilaiToFloat(this.sg4.cells(11,i)) - 1);					
				}
			}
		}
		catch(e) {
			alert(e);
		}
		
	},
	doHitungEfek: function(sender) {
		try {
			//jumlah hari dlm bulan
			this.sg5.clear();
			//this.pc2.setActivePage(this.pc2.childPage[2]);		
			
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			for (var i = 0; i < tglAkhir;i++){
				var k = i+1;
				var idx = k.toString();
				if (idx.length == 1) var nu = "0"+idx;
				if (idx.length == 2) var nu = idx;
	
				var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
				this.sg5.appendData([tgl,"0","0","0","0","0","0","0","0",  "0","0","0", "EFEK"]);						
			}
			

			var strSQL = "select modul,tanggal "+
				",sum(sawal) as sawal "+
				",sum(masuk) as masuk "+
				",sum(keluar) as keluar "+
				",sum(sakhir) as sakhir "+
				",sum(bunga) as bunga "+
				",sum(pajak) as pajak "+
				",sum(beban) as beban "+
				",sum(bunga_net) as bunga_net "+
				"from "+
				"( "+

				"select 'EFEK' as modul,tanggal "+
				",nab_awal as sawal"+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_rd_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and kode_rdklp in ('RDPD','RDPR','RDPT') "+

				"union all "+
				
				// 30% dari reksadana campuran masuk ke efek
				"select 'EFEK' as modul,tanggal "+
				",round(nab_awal * 0.3,0) as sawal "+
				",round(beli * 0.3,0) as masuk "+
				",round(jual * 0.3,0) as keluar "+
				",round(nab_akhir * 0.3,0) as sakhir "+
				",round(hasil_gross * 0.3,0) as bunga "+
				",round(nilai_pajak * 0.3,0) as pajak "+
				",round(jml_beban * 0.3,0) as beban "+
				",round(hasil_net * 0.3,0) as bunga_net "+
				"from inv_rd_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and kode_rdklp = 'RDCM' "+

				"union all "+

				"select 'EFEK' as modul,tanggal "+
				",0 as nab_awal "+
				",0 as beli "+
				",0 as jual "+
				",0 as nab_akhir "+
				",0 as hasil_gross "+
				",0 as nilai_pajak "+
				",nilai_ja+nilai_nonja as jml_beban "+
				",0 as hasil_net "+
				"from inv_roi_beban "+ 
				"where periode ='"+this.e_periode.getText()+"' and kelas='EFEK' "+

				") a "+

				"group by a.modul,a.tanggal "+
				"order by a.modul,a.tanggal ";

			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNAB = data;
				var line;
				for (var i=0;i < this.dataNAB.rs.rows.length;i++){
					line = this.dataNAB.rs.rows[i];	
					for (var j=0;j < this.sg5.getRowCount();j++){
						if (line.modul = this.sg5.cells(12,j) && line.tanggal == this.sg5.cells(0,j)) {
							this.sg5.cells(1,j,parseFloat(line.sawal));
							this.sg5.cells(2,j,parseFloat(line.masuk));
							this.sg5.cells(3,j,parseFloat(line.keluar));
							this.sg5.cells(4,j,parseFloat(line.sakhir));
							this.sg5.cells(5,j,parseFloat(line.bunga));
							this.sg5.cells(6,j,parseFloat(line.pajak));
							this.sg5.cells(7,j,parseFloat(line.beban));
							this.sg5.cells(8,j,parseFloat(line.bunga_net) - parseFloat(line.pajak) - parseFloat(line.beban));							
						}
					}					
				}									
			}	

			//============================================== HITUNG ROI ================================================
			for (var i=0;i < this.sg5.getRowCount();i++){
				//---> roi net = hasil_net / nab_awal
				if (nilaiToFloat(this.sg5.cells(1,i)) == 0) var roiHari = 0;
				else var roiHari = Math.round(nilaiToFloat(this.sg5.cells(8,i)) /  nilaiToFloat(this.sg5.cells(1,i)) * 10000) /10000;									
				this.sg5.cells(9,i,roiHari);

				//---> kinerja = roi + 1;
				this.sg5.cells(10,i,roiHari+1);
				
				//---> roi kumulatif = kinerja * roi_kum tgl sebeumnya
				if (i == 0) var roiKum = roiHari + 1;
				else {
					var roiKum = (roiHari+1) * nilaiToFloat(this.sg5.cells(11,i-1));
				}
				this.sg5.cells(11,i,roiKum);
			}
			
			//rumus product
			for (var i=0;i < this.sg5.getRowCount();i++){
				if (this.sg5.rowValid(i)) {	
					if (this.sg5.cells(11,i) != "0") this.sg5.cells(11,i,nilaiToFloat(this.sg5.cells(11,i)) - 1);					
				}
			}

		}
		catch(e) {
			alert(e);
		}		
	},
	doHitungPropensa: function(sender) {
		try {
			//jumlah hari dlm bulan
			this.sg6.clear();
			//this.pc2.setActivePage(this.pc2.childPage[3]);		
			
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			for (var i = 0; i < tglAkhir;i++){
				var k = i+1;
				var idx = k.toString();
				if (idx.length == 1) var nu = "0"+idx;
				if (idx.length == 2) var nu = idx;
	
				var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
				this.sg6.appendData([tgl,"0","0","0","0","0","0","0","0",  "0","0","0", "PROPENSA"]);						
			}
			

			var strSQL = "select modul,tanggal "+
				",sum(sawal) as sawal "+
				",sum(masuk) as masuk "+
				",sum(keluar) as keluar "+
				",sum(sakhir) as sakhir "+
				",sum(bunga) as bunga "+
				",sum(pajak) as pajak "+
				",sum(beban) as beban "+
				",sum(bunga_net) as bunga_net "+
				"from "+
				"( "+

				"select 'PROPENSA' as modul,tanggal "+
				",nab_awal as sawal"+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_sp_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' "+

				"union all "+

				"select 'PROPENSA' as modul,tanggal "+
				",0 as nab_awal "+
				",0 as beli "+
				",0 as jual "+
				",0 as nab_akhir "+
				",0 as hasil_gross "+
				",0 as nilai_pajak "+
				",nilai_ja+nilai_nonja as jml_beban "+
				",0 as hasil_net "+
				"from inv_roi_beban "+ 
				"where periode ='"+this.e_periode.getText()+"' and kelas='PROPENSA' "+

				") a "+

				"group by a.modul,a.tanggal "+
				"order by a.modul,a.tanggal ";

			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNAB = data;
				var line;
				for (var i=0;i < this.dataNAB.rs.rows.length;i++){
					line = this.dataNAB.rs.rows[i];	
					for (var j=0;j < this.sg6.getRowCount();j++){
						if (line.modul = this.sg6.cells(12,j) && line.tanggal == this.sg6.cells(0,j)) {
							this.sg6.cells(1,j,parseFloat(line.sawal));
							this.sg6.cells(2,j,parseFloat(line.masuk));
							this.sg6.cells(3,j,parseFloat(line.keluar));
							this.sg6.cells(4,j,parseFloat(line.sakhir));
							this.sg6.cells(5,j,parseFloat(line.bunga));
							this.sg6.cells(6,j,parseFloat(line.pajak));
							this.sg6.cells(7,j,parseFloat(line.beban));
							this.sg6.cells(8,j,parseFloat(line.bunga_net) - parseFloat(line.pajak) - parseFloat(line.beban));							
						}
					}					
				}									
			}	

			//============================================== HITUNG ROI ================================================
			for (var i=0;i < this.sg6.getRowCount();i++){
				//---> roi net = hasil_net / nab_awal
				if (nilaiToFloat(this.sg6.cells(1,i)) == 0) var roiHari = 0;
				else var roiHari = Math.round(nilaiToFloat(this.sg6.cells(8,i)) /  nilaiToFloat(this.sg6.cells(1,i)) * 10000) /10000;									
				this.sg6.cells(9,i,roiHari);

				//---> kinerja = roi + 1;
				this.sg6.cells(10,i,roiHari+1);
				
				//---> roi kumulatif = kinerja * roi_kum tgl sebeumnya
				if (i == 0) var roiKum = roiHari + 1;
				else {
					var roiKum = (roiHari+1) * nilaiToFloat(this.sg6.cells(11,i-1));
				}
				this.sg6.cells(11,i,roiKum);
			}
			
			//rumus product
			for (var i=0;i < this.sg6.getRowCount();i++){
				if (this.sg6.rowValid(i)) {	
					if (this.sg6.cells(11,i) != "0") this.sg6.cells(11,i,nilaiToFloat(this.sg6.cells(11,i)) - 1);					
				}
			}

		}
		catch(e) {
			alert(e);
		}		
	},




	doHitungBlended: function(sender) {
		try {
			//jumlah hari dlm bulan
			this.sg7.clear();
			//this.pc2.setActivePage(this.pc2.childPage[3]);		
			
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			for (var i = 0; i < tglAkhir;i++){
				var k = i+1;
				var idx = k.toString();
				if (idx.length == 1) var nu = "0"+idx;
				if (idx.length == 2) var nu = idx;
	
				var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
				this.sg7.appendData([tgl,"0","0","0","0","0","0","0","0",  "0","0","0", "BLENDED"]);						
			}
			

			var strSQL = "select modul,tanggal "+
				",sum(sawal) as sawal "+
				",sum(masuk) as masuk "+
				",sum(keluar) as keluar "+
				",sum(sakhir) as sakhir "+
				",sum(bunga) as bunga "+
				",sum(pajak) as pajak "+
				",sum(beban) as beban "+
				",sum(bunga_net) as bunga_net "+
				"from "+
				"( "+

				"select 'BLENDED' as modul,tanggal "+
				",sawal "+
				",masuk "+
				",keluar "+
				",sakhir "+
				",bunga "+
				",pajak "+
				",beban "+
				",bunga_net "+
				"from inv_depo_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and status_dana ='DAKES' "+

				"union all "+

				"select 'BLENDED' as modul,tanggal "+
				",nab_awal as sawal "+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_saham_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' "+

				"union all "+

				"select 'BLENDED' as modul,tanggal "+
				",nab_awal as sawal"+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_rd_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' and kode_rdklp not in ('RDDK','RPUD') "+

				"union all "+

				"select 'BLENDED' as modul,tanggal "+
				",nab_awal as sawal"+
				",beli as masuk "+
				",jual as keluar "+
				",nab_akhir as sakhir "+
				",hasil_gross as bunga "+
				",nilai_pajak as pajak "+
				",jml_beban as beban "+
				",hasil_net as bunga_net "+
				"from inv_sp_roi "+ 
				"where periode ='"+this.e_periode.getText()+"' "+

				"union all "+

				"select 'BLENDED' as modul,tanggal "+
				",0 as nab_awal "+
				",0 as beli "+
				",0 as jual "+
				",0 as nab_akhir "+
				",0 as hasil_gross "+
				",0 as nilai_pajak "+
				",sum(nilai_ja+nilai_nonja) as jml_beban "+
				",0 as hasil_net "+
				"from inv_roi_beban "+ 
				"where periode ='"+this.e_periode.getText()+"' group by tanggal "+

				") a "+

				"group by a.modul,a.tanggal "+
				"order by a.modul,a.tanggal ";

			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNAB = data;
				var line;
				for (var i=0;i < this.dataNAB.rs.rows.length;i++){
					line = this.dataNAB.rs.rows[i];	
					for (var j=0;j < this.sg7.getRowCount();j++){
						if (line.modul = this.sg7.cells(12,j) && line.tanggal == this.sg7.cells(0,j)) {
							this.sg7.cells(1,j,parseFloat(line.sawal));
							this.sg7.cells(2,j,parseFloat(line.masuk));
							this.sg7.cells(3,j,parseFloat(line.keluar));
							this.sg7.cells(4,j,parseFloat(line.sakhir));
							this.sg7.cells(5,j,parseFloat(line.bunga));
							this.sg7.cells(6,j,parseFloat(line.pajak));
							this.sg7.cells(7,j,parseFloat(line.beban));
							this.sg7.cells(8,j,parseFloat(line.bunga_net) - parseFloat(line.pajak) - parseFloat(line.beban));							
						}
					}					
				}									
			}	

			//============================================== HITUNG ROI ================================================
			//total semua modal investasi
			var strSQL = "select distinct tot_beban "+
						"from inv_roi_beban where periode='"+this.e_periode.getText()+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var totBeban = parseFloat(line.tot_beban);
				}
			}

			//beban yakes belum kehitung sbg roi blended			
			/*
			for (var i=0;i < this.sg7.getRowCount();i++){
				//---> roi net = hasil_net / nab_awal
				if (nilaiToFloat(this.sg7.cells(1,i)) == 0) var roiHari = 0;
				else var roiHari = Math.round(nilaiToFloat(this.sg7.cells(8,i)) /  nilaiToFloat(this.sg7.cells(1,i)) * 10000) /10000;									
				this.sg7.cells(9,i,roiHari);

				//---> kinerja = roi + 1;
				this.sg7.cells(10,i,roiHari+1);
				
				//---> roi kumulatif = kinerja * roi_kum tgl sebeumnya
				if (i == 0) var roiKum = roiHari + 1;
				else {
					var roiKum = (roiHari+1) * nilaiToFloat(this.sg7.cells(11,i-1));
				}
				this.sg7.cells(11,i,roiKum);
			}
			
			//rumus product
			for (var i=0;i < this.sg7.getRowCount();i++){
				if (this.sg7.rowValid(i)) {	
					if (this.sg7.cells(11,i) != "0") this.sg7.cells(11,i,nilaiToFloat(this.sg7.cells(11,i)) - 1);					
				}
			}

			*/

		}
		catch(e) {
			alert(e);
		}		
	},

	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_roi_global where periode='"+this.e_periode.getText()+"' ");
					
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)) {	    
							sql.add("insert into inv_roi_global (modul,periode,tanggal,sawal,masuk,keluar,sakhir,bunga,pajak,beban,bunga_net,roi_hari,roi_kinerja,roi_kum) values "+
									"('"+this.sg3.cells(12,i)+"','"+this.e_periode.getText()+"','"+this.sg3.cells(0,i)+"',"+nilaiToFloat(this.sg3.cells(1,i))+","+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+","+nilaiToFloat(this.sg3.cells(6,i))+","+nilaiToFloat(this.sg3.cells(7,i))+","+nilaiToFloat(this.sg3.cells(8,i))+","+nilaiToFloat(this.sg3.cells(9,i))+","+nilaiToFloat(this.sg3.cells(10,i))+","+nilaiToFloat(this.sg3.cells(11,i))+")");					
						}
					}
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)) {	    
							sql.add("insert into inv_roi_global (modul,periode,tanggal,sawal,masuk,keluar,sakhir,bunga,pajak,beban,bunga_net,roi_hari,roi_kinerja,roi_kum) values "+
									"('"+this.sg4.cells(12,i)+"','"+this.e_periode.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(1,i))+","+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+","+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(5,i))+","+nilaiToFloat(this.sg4.cells(6,i))+","+nilaiToFloat(this.sg4.cells(7,i))+","+nilaiToFloat(this.sg4.cells(8,i))+","+nilaiToFloat(this.sg4.cells(9,i))+","+nilaiToFloat(this.sg4.cells(10,i))+","+nilaiToFloat(this.sg4.cells(11,i))+")");					
						}
					}
					for (var i=0;i < this.sg5.getRowCount();i++){
						if (this.sg5.rowValid(i)) {	    
							sql.add("insert into inv_roi_global (modul,periode,tanggal,sawal,masuk,keluar,sakhir,bunga,pajak,beban,bunga_net,roi_hari,roi_kinerja,roi_kum) values "+
									"('"+this.sg5.cells(12,i)+"','"+this.e_periode.getText()+"','"+this.sg5.cells(0,i)+"',"+nilaiToFloat(this.sg5.cells(1,i))+","+nilaiToFloat(this.sg5.cells(2,i))+","+nilaiToFloat(this.sg5.cells(3,i))+","+nilaiToFloat(this.sg5.cells(4,i))+","+nilaiToFloat(this.sg5.cells(5,i))+","+nilaiToFloat(this.sg5.cells(6,i))+","+nilaiToFloat(this.sg5.cells(7,i))+","+nilaiToFloat(this.sg5.cells(8,i))+","+nilaiToFloat(this.sg5.cells(9,i))+","+nilaiToFloat(this.sg5.cells(10,i))+","+nilaiToFloat(this.sg5.cells(11,i))+")");					
						}
					}
					for (var i=0;i < this.sg6.getRowCount();i++){
						if (this.sg6.rowValid(i)) {	    
							sql.add("insert into inv_roi_global (modul,periode,tanggal,sawal,masuk,keluar,sakhir,bunga,pajak,beban,bunga_net,roi_hari,roi_kinerja,roi_kum) values "+
									"('"+this.sg6.cells(12,i)+"','"+this.e_periode.getText()+"','"+this.sg6.cells(0,i)+"',"+nilaiToFloat(this.sg6.cells(1,i))+","+nilaiToFloat(this.sg6.cells(2,i))+","+nilaiToFloat(this.sg6.cells(3,i))+","+nilaiToFloat(this.sg6.cells(4,i))+","+nilaiToFloat(this.sg6.cells(5,i))+","+nilaiToFloat(this.sg6.cells(6,i))+","+nilaiToFloat(this.sg6.cells(7,i))+","+nilaiToFloat(this.sg6.cells(8,i))+","+nilaiToFloat(this.sg6.cells(9,i))+","+nilaiToFloat(this.sg6.cells(10,i))+","+nilaiToFloat(this.sg6.cells(11,i))+")");					
						}
					}
					for (var i=0;i < this.sg7.getRowCount();i++){
						if (this.sg7.rowValid(i)) {	    
							sql.add("insert into inv_roi_global (modul,periode,tanggal,sawal,masuk,keluar,sakhir,bunga,pajak,beban,bunga_net,roi_hari,roi_kinerja,roi_kum) values "+
									"('"+this.sg7.cells(12,i)+"','"+this.e_periode.getText()+"','"+this.sg7.cells(0,i)+"',"+nilaiToFloat(this.sg7.cells(1,i))+","+nilaiToFloat(this.sg7.cells(2,i))+","+nilaiToFloat(this.sg7.cells(3,i))+","+nilaiToFloat(this.sg7.cells(4,i))+","+nilaiToFloat(this.sg7.cells(5,i))+","+nilaiToFloat(this.sg7.cells(6,i))+","+nilaiToFloat(this.sg7.cells(7,i))+","+nilaiToFloat(this.sg7.cells(8,i))+","+nilaiToFloat(this.sg7.cells(9,i))+","+nilaiToFloat(this.sg7.cells(10,i))+","+nilaiToFloat(this.sg7.cells(11,i))+")");					
						}
					}
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					setTipeButton(tbSimpan);
					this.sg3.clear(1);
					this.sg4.clear(1);
					this.sg5.clear(1);
					this.sg6.clear(1);
					this.sg7.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);														
				}
				break;
			case "simpan" :	
				this.simpan();
				break;											
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});