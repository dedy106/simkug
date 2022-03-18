window.app_saku3_transaksi_investasi_invest2_fRoiSP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fRoiSP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fRoiSP";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data ROI Saham Penyertaan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,text:"201701"});
		this.bHitung = new button(this,{bound:[120,13,100,18],caption:"Hitung",click:[this,"doHitung"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["ROi Deposito","Data Rekap"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:34,tag:9,
		            colTitle:["Tanggal","NAB Awal","Pembelian","Penjualan","SPI","NAB Akhir","Deviden","Capital Gain","Naik-Turun","Hasil Gross",
		                      "Tarif Pajak","Nominal Pajak","Hasil Stlh Pajak","Bbn Jasa TA","Bbn Lain","Jml Beban","Hasil Net",
		                      "ROI Harian Netto","Kinerja+1 Netto","ROI Kumulatif Netto",
		                      "ROI Harian Gross","Kinerja+1 Gross","ROI Kumulatif Gross",  
		                      "ROI Harian GAT","Kinerja+1 GAT","ROI Kumulatif GAT",           //GAT = Gross After Tax
		                      "Kode Klp","NBuku Awal","NBuku Akhir","Penjualan Buku",
		                      "SPI Jual Rev","NOleh Awal","NOleh Akhir","Penjualan Oleh"],  
					colWidth:[[33,32,31,30,  29,28,27, 26,25,24,23,22,21,20,19,18,17,  16,15,14,13,12,11,10,  9,8,7,6,5,4,3,2,1,0],[100,100,100,100,  100,100,100, 100,100,100,100,100,100,100,100,100,100, 100,100,100,100,100,100,100,  100,100,100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8,9, 10,11,12,13,14,15,16, 17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,   cfNilai,cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
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
window.app_saku3_transaksi_investasi_invest2_fRoiSP.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fRoiSP.implement({
	doHitung: function(sender) {
		try {
			var tglAwalBln = this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01";
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			var periode  = this.e_periode.getText();
			var bln = parseFloat(periode.substr(4,2));
			var thn = parseFloat(periode.substr(0,4)); 
			
			if (bln > 1) {
				bln -=1;
				var thnbukuawal = thn-1;
			}
			else {
				bln = 13;
				thn -= 1;
				var thnbukuawal = thn;
			}
			if (bln < 10) bln = "0"+bln;
			else bln = bln.toString();
			
			var periodeAwal = thn.toString()+bln;
			
			var tglAkhirBln = tglAwalBln.substr(0,8) + tglAkhir;			
			var sql = "call sp_sp_roi_tmp ('"+tglAwalBln+"','"+tglAkhirBln+"','"+periodeAwal+"','"+thnbukuawal+"', '"+this.e_periode.getText()+"','"+this.app._userLog+"')";			
			this.dbLib.execQuerySync(sql);	
			

			var data1 = this.dbLib.getDataProvider("select kode_mitra from inv_mitra",true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg3.clear();
				for (var n in data1.rs.rows){
					line1 = data1.rs.rows[n];																																			
					for (var i = 0; i < tglAkhir;i++){
						var k = i+1;
						var idx = k.toString();
						if (idx.length == 1) var nu = "0"+idx;
						if (idx.length == 2) var nu = idx;
			
						var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
						this.sg3.appendData([tgl,"0","0","0","0","0","0","0","0","0",  "0","0","0","0","0","0","0"  ,"0","0","0","0","0","0","0","0","0",line1.kode_mitra,"0","0","0", "0","0","0","0"]);										
					}
				}
			}
			
			//=========================================================  HITUNG ===================================================
			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {		
				    	
					var strSQL = "select isnull(round(sum(jumlah * h_wajar),0),0) as nbeli "+
					             "from inv_sproi_tmp where modul='BELI' and kode_mitra='"+this.sg3.cells(26,i)+"' "+
								 "and tanggal='"+this.sg3.cells(0,i)+"' and nik_user='"+this.app._userLog+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {		
							this.sg3.cells(2,i,parseFloat(line.nbeli));								
						}
					}
					
					var spi_rev = 0;	
					var strSQL = "select isnull(round(sum(jumlah * h_wajar),0) ,0) as njual, "+
					             "       isnull(round(sum(jumlah * (h_wajar-h_oleh)),0),0) - isnull(round(sum(beban),0),0) as gl_jual, "+
					             "       isnull(round(sum(jumlah * h_buku),0),0) as njualbuku, "+
					             "       isnull(round(sum(jumlah * (h_buku-h_oleh)),0),0) as spi_rev, "+
					             "       isnull(round(sum(jumlah * h_oleh),0),0) as njualoleh "+					             
								 "from inv_sproi_tmp where modul='JUAL' and kode_mitra='"+this.sg3.cells(26,i)+"' "+
								 "and tanggal='"+this.sg3.cells(0,i)+"' and nik_user='"+this.app._userLog+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {		
							this.sg3.cells(3,i,parseFloat(line.njual));
							this.sg3.cells(7,i,parseFloat(line.gl_jual));
							this.sg3.cells(29,i,parseFloat(line.njualbuku));
							this.sg3.cells(30,i,parseFloat(line.spi_rev));
							this.sg3.cells(33,i,parseFloat(line.njualoleh));
							
							var spi_rev = parseFloat(line.spi_rev);						
							
						}
					}
					
					var strSQL = "select isnull(round(sum(jtot*h_wajar),0),0) as sakhir "+
								 "from ( 		"+ 
								 "		 select kode_mitra,sum(case when modul='JUAL' then -jumlah else jumlah end)  as jtot "+
								 "		 from inv_sproi_tmp  "+
								 "		 where kode_mitra='"+this.sg3.cells(26,i)+"' and tanggal<='"+this.sg3.cells(0,i)+"' and nik_user='"+this.app._userLog+"' "+
								 "		 group by kode_mitra "+
								 "	 ) a inner join inv_sp_harga b on a.kode_mitra=b.kode_mitra and b.tanggal='"+this.sg3.cells(0,i)+"'";
		 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {		
							this.sg3.cells(5,i,parseFloat(line.sakhir));																			
						}
					}
					
					var nbuku = 0;
					if (i == 0 || this.sg3.cells(26,i) != this.sg3.cells(26,i-1)) {
						var strSQL = "select "+
									 "       isnull(round(sum(jumlah * h_oleh),0),0) as noleh, "+
									 "       isnull(round(sum(jumlah * h_wajar),0),0) as nwajar, "+
						             "       isnull(round(sum(jumlah * h_buku),0),0) as nbuku "+
						             "from inv_sproi_tmp where modul='SAWAL' and kode_mitra='"+this.sg3.cells(26,i)+"' "+
									 "and tanggal='"+this.sg3.cells(0,i)+"' and nik_user='"+this.app._userLog+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined) {		
								this.sg3.cells(1,i,parseFloat(line.nwajar));	
								this.sg3.cells(31,i,parseFloat(line.noleh));					
								this.sg3.cells(27,i,parseFloat(line.nbuku));
								
							    var noleh = parseFloat(line.noleh) + nilaiToFloat(this.sg3.cells(2,i)) - nilaiToFloat(this.sg3.cells(33,i))							   
							    var nbuku = parseFloat(line.nbuku) + nilaiToFloat(this.sg3.cells(2,i)) - nilaiToFloat(this.sg3.cells(29,i))							   
							    
							    this.sg3.cells(28,i,nbuku);	
							    this.sg3.cells(32,i,noleh);					
						
							}
						}
					}
					else {											
						this.sg3.cells(1,i,this.sg3.cells(5,i-1));    
						this.sg3.cells(27,i,this.sg3.cells(28,i-1));						
						var nbuku = nilaiToFloat(this.sg3.cells(27,i)) + nilaiToFloat(this.sg3.cells(2,i)) - nilaiToFloat(this.sg3.cells(29,i));						
						this.sg3.cells(28,i,nbuku);
						
						this.sg3.cells(31,i,this.sg3.cells(32,i-1));						
						var noleh = nilaiToFloat(this.sg3.cells(31,i)) + nilaiToFloat(this.sg3.cells(2,i)) - nilaiToFloat(this.sg3.cells(33,i));						
						this.sg3.cells(32,i,noleh);
					}
					
					var spi = (nilaiToFloat(this.sg3.cells(5,i)) - nilaiToFloat(this.sg3.cells(1,i))) - (nilaiToFloat(this.sg3.cells(28,i)) - nilaiToFloat(this.sg3.cells(27,i)));
					this.sg3.cells(4,i,spi)
				
					var naikTurun = spi+spi_rev;
					this.sg3.cells(8,i,naikTurun);
						
					var strSQL = "select isnull(SUM(a.nilai_dev) ,0) as dev_bruto, 0 as pph "+
								 "from inv_spdev_d a inner join inv_spdev_m b on a.no_spdev=b.no_spdev "+
								 "					 inner join inv_mitra c on a.kode_mitra=c.kode_mitra "+
								 "where b.tanggal between '"+this.sg3.cells(0,i)+"' and '"+this.sg3.cells(0,i)+"' and c.kode_mitra = '"+this.sg3.cells(26,i)+"' ";								 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {								   
							this.sg3.cells(6,i,parseFloat(line.dev_bruto));					
							this.sg3.cells(11,i,nilaiToFloat(this.sg3.cells(11,i)) + parseFloat(line.pph));	
						}
					}
					
					var hGross = nilaiToFloat(this.sg3.cells(6,i)) + nilaiToFloat(this.sg3.cells(7,i)) + nilaiToFloat(this.sg3.cells(8,i));
					this.sg3.cells(9,i,hGross);	
					this.sg3.cells(12,i,hGross);	
					this.sg3.cells(16,i,hGross);
					
					//roi net
					var roiHari = Math.round(nilaiToFloat(this.sg3.cells(16,i)) /  nilaiToFloat(this.sg3.cells(1,i)) * 10000) /10000;
					this.sg3.cells(17,i,roiHari);
					this.sg3.cells(18,i,roiHari+1);
					
					if (i == 0 || this.sg3.cells(26,i) != this.sg3.cells(26,i-1)) var roiKum = roiHari + 1;
					else {
						var roiKum = (roiHari+1) * nilaiToFloat(this.sg3.cells(19,i-1));
					}
					this.sg3.cells(19,i,roiKum);
					
					/*
					//roi gross
					var roiHari = Math.round(nilaiToFloat(this.sg3.cells(9,i)) /  nilaiToFloat(this.sg3.cells(1,i)) * 10000) /10000;
					this.sg3.cells(20,i,roiHari);
					this.sg3.cells(21,i,roiHari+1);
					
					if (i == 0 || this.sg3.cells(26,i) != this.sg3.cells(26,i-1)) var roiKum = roiHari + 1;
					else {
						var roiKum = (roiHari+1) * nilaiToFloat(this.sg3.cells(22,i-1));
					}
					this.sg3.cells(22,i,roiKum);
					
					
					//roi after tax
					var roiHari = Math.round(nilaiToFloat(this.sg3.cells(12,i)) /  nilaiToFloat(this.sg3.cells(1,i)) * 10000) /10000;
					this.sg3.cells(23,i,roiHari);
					this.sg3.cells(24,i,roiHari+1);
					
					if (i == 0 || this.sg3.cells(26,i) != this.sg3.cells(26,i-1)) var roiKum = roiHari + 1;
					else {
						var roiKum = (roiHari+1) * nilaiToFloat(this.sg3.cells(25,i-1));
					}
					this.sg3.cells(25,i,roiKum);
					*/
				}
			}
			
			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {	
					if (this.sg3.cells(19,i) != "0") this.sg3.cells(19,i,nilaiToFloat(this.sg3.cells(19,i)) - 1);
					if (this.sg3.cells(22,i) != "0") this.sg3.cells(22,i,nilaiToFloat(this.sg3.cells(22,i)) - 1);
					if (this.sg3.cells(25,i) != "0") this.sg3.cells(25,i,nilaiToFloat(this.sg3.cells(25,i)) - 1);
				}
			}
			
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
					
					sql.add("delete from inv_sp_roi where periode ='"+this.e_periode.getText()+"' ");
					
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)) {	      
							sql.add("insert into inv_sp_roi(periode,kode_mitra,tanggal,nab_awal,beli,jual,spi,nab_akhir,deviden,gainloss,naik_turun,hasil_gross,tarif_pajak,nilai_pajak,hasil_set_pajak,jasa_ta,beban_lain,jml_beban,hasil_net,roi_hari_netto,roi_kinerja_netto,roi_kum_netto,roi_hari_gross,roi_kinerja_gross,roi_kum_gross,roi_hari_gbt,roi_kinerja_gbt,roi_kum_gbt, nbuku_awal,nbuku_akhir,njual_buku, spi_jual_rev,noleh_awal,noleh_akhir,njual_oleh) values "+
									"('"+this.e_periode.getText()+"','"+this.sg3.cells(26,i)+"','"+this.sg3.cells(0,i)+"',"+nilaiToFloat(this.sg3.cells(1,i))+","+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+","+nilaiToFloat(this.sg3.cells(6,i))+","+nilaiToFloat(this.sg3.cells(7,i))+","+nilaiToFloat(this.sg3.cells(8,i))+","+nilaiToFloat(this.sg3.cells(9,i))+
									","+nilaiToFloat(this.sg3.cells(10,i))+","+nilaiToFloat(this.sg3.cells(11,i))+","+nilaiToFloat(this.sg3.cells(12,i))+","+nilaiToFloat(this.sg3.cells(13,i))+","+nilaiToFloat(this.sg3.cells(14,i))+","+nilaiToFloat(this.sg3.cells(15,i))+","+nilaiToFloat(this.sg3.cells(16,i))+
									","+nilaiToFloat(this.sg3.cells(17,i))+","+nilaiToFloat(this.sg3.cells(18,i))+","+nilaiToFloat(this.sg3.cells(19,i))+
									","+nilaiToFloat(this.sg3.cells(20,i))+","+nilaiToFloat(this.sg3.cells(21,i))+","+nilaiToFloat(this.sg3.cells(22,i))+
									","+nilaiToFloat(this.sg3.cells(23,i))+","+nilaiToFloat(this.sg3.cells(24,i))+","+nilaiToFloat(this.sg3.cells(25,i))+
									","+nilaiToFloat(this.sg3.cells(27,i))+","+nilaiToFloat(this.sg3.cells(28,i))+","+nilaiToFloat(this.sg3.cells(29,i))+
									","+nilaiToFloat(this.sg3.cells(30,i))+","+nilaiToFloat(this.sg3.cells(31,i))+","+nilaiToFloat(this.sg3.cells(32,i))+","+nilaiToFloat(this.sg3.cells(33,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbSimpan);
					this.sg3.clear(1);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Periode : "+ this.e_periode.getText()+")");							
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