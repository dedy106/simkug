window.app_saku3_transaksi_investasi_invest2_fRoiBeban = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fRoiBeban.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fRoiBeban";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Beban Investasi", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,text:"201701"});
		this.e_totmi = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Ttl Beban Invest", tag:1,tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_total = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Ttl Beban Yakes", tag:1,tipeText:ttNilai, text:"0"});		
		this.bHitAll = new button(this,{bound:[240,12,100,18],caption:"Hitung",click:[this,"doHitungAll"]});			
				
		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["List Beban","Hitung Beban"]});				
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["Kode Akun","Nama","Net Mutasi Beban"],
					colWidth:[[2,1,0],[100,300,100]],
					colFormat:[[2],[cfNilai]],
				    readOnly:true, 
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
		            colTitle:["Kelas","Modul","Jenis","NAB Akhir","% JA","Nilai JA","% Non JA","Nilai Non JA"],
					colWidth:[[7,6,5,4,3,2,1,0],[120,120,120,120,120,120,120,100]],
					colFormat:[[3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});

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
window.app_saku3_transaksi_investasi_invest2_fRoiBeban.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fRoiBeban.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();						

			this.doCekDataAkun();				
		} catch(e) {alert(e);}
	},
	doCekDataAkun: function() {
		var strSQL = "select kode_akun from masakun where kode_akun like '51030%' and kode_lokasi ='"+this.app._lokasi+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataAkun = data;
		}				
		
		var total = 0;
		this.bbnJA = this.bbnNonJA = 0;
		for (var i=0; i < this.sg1.getRowCount();i++){			
			if (this.sg1.cells(0,i) == "51030102") {
				this.bbnJA = nilaiToFloat(this.sg1.cells(2,i));				
			}
			else {
				this.bbnNonJA += nilaiToFloat(this.sg1.cells(2,i));				
			}

			var inValid = true;
			for (var j=0;j < this.dataAkun.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataAkun.rs.rows[j].kode_akun) {
					inValid = false;
				}
			}	
			if (inValid) {
				system.alert(this,this.sg1.cells(0,i)+" - Kode Akun Tidak Valid","");
				return false;
			}
		}		
		this.e_totmi.setText(floatToNilai(this.bbnJA+this.bbnNonJA));	
	},
	doHitungAll: function(sender) {
		if (this.e_totmi.getText() != "0") this.doHitungBeban();		
		else system.alert(this,"Nilai Beban Investasi tidak boleh nol / kurang.","");
	},
	doHitungBeban: function(sender) {
		try {
			this.pc2.setActivePage(this.pc2.childPage[1]);		

			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,121),1,10) as tglakhir" ;			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = line.tglakhir;
					this.tglAkhir = line.tglakhir;
				}
			}
			
			//total semua modal investasi
			var strSQL = "select sum(nab_akhir) as nab_akhir "+
						"from ( "+
						"select sakhir as nab_akhir from inv_depo_roi where tanggal = '"+tglAkhir+"' and status_dana='DAKES' "+
						"union "+
						"select nab_akhir from inv_saham_roi where tanggal = '"+tglAkhir+"' "+
						"union "+
						"select nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp not in ('RPUD','RDDK') "+
						"union "+
						"select nab_akhir from inv_sp_roi where tanggal = '"+tglAkhir+"' "+
						") a ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var totNAB = parseFloat(line.nab_akhir);
				}
			}

			//total modal yang kelas SAHAM
			var strSQL = "select sum(nab_akhir) as nab_akhir "+
						"from ( "+
						
						"select nab_akhir from inv_saham_roi where tanggal = '"+tglAkhir+"' "+
						"union "+
						"select nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp in ('RDSH','RETF') "+
						"union "+
						"select (nab_akhir * 0.7) as nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp = 'RDCM' "+
						
						") a ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var totNABSaham = parseFloat(line.nab_akhir);
				}
			}
			
			var strSQL = "select *,nab_akhir  / "+totNAB+" as persen,case when kelas = 'SAHAM' then nab_akhir / "+totNABSaham+"  else 0 end as p_bbnsaham "+
						"from ( "+
						"select kode_kelola,jenis,'CASH' as kelas,sakhir as nab_akhir from inv_depo_roi where tanggal = '"+tglAkhir+"' and status_dana='DAKES' "+
						"union "+
						"select kode_rdklp as kode_kelola,'RD','CASH' as kelas, nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp = 'RDPU' "+
						"union "+

						"select kode_kelola,'SAHAM','SAHAM' as kelas,nab_akhir from inv_saham_roi where tanggal = '"+tglAkhir+"' "+
						"union "+
						"select kode_rdklp as kode_kelola,'RD','SAHAM' as kelas,nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp in ('RDSH','RETF') "+
						"union "+
						"select kode_rdklp as kode_kelola,'RD','SAHAM' as kelas,(nab_akhir * 0.7) as nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp = 'RDCM' "+
						"union "+

						"select kode_rdklp as kode_kelola,'RD','EFEK' as kelas,nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp in ('RDPD','RDPR','RDPT') "+
						"union "+
						"select kode_rdklp as kode_kelola,'RD','EFEK' as kelas,(nab_akhir * 0.3) as nab_akhir from inv_rd_roi where tanggal = '"+tglAkhir+"' and kode_rdklp = 'RDCM' "+
						"union "+

						"select kode_mitra as kode_kelola,'PROPENSA','PROPENSA' as kelas,nab_akhir from inv_sp_roi where tanggal = '"+tglAkhir+"' "+
						") a "+
						"order by kelas,jenis,kode_kelola";

			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg2.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg2.appendData([line1.kelas.toUpperCase(),line1.jenis.toUpperCase(),line1.kode_kelola,floatToNilai(line1.nab_akhir),floatToNilai(line1.persen),"0",floatToNilai(line1.p_bbnsaham),"0"]);
				}
			} else this.sg2.clear(1);	

			
			for (var i=0; i < this.sg2.getRowCount();i++){
				var nilaiJA = Math.round(nilaiToFloat(this.sg2.cells(4,i)) * this.bbnJA);
				this.sg2.cells(5,i,nilaiJA);

				var nilaiNonJA = Math.round(nilaiToFloat(this.sg2.cells(6,i)) * this.bbnNonJA);
				this.sg2.cells(7,i,nilaiNonJA);
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
					sql.add("delete from inv_roi_beban where periode='"+this.e_periode.getText()+"' ");

					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) {	    
							sql.add("insert into inv_roi_beban (periode,tanggal,kelas,modul,jenis,nab,p_ja,nilai_ja,p_nonja,nilai_nonja,tot_beban) values "+
									"('"+this.e_periode.getText()+"','"+this.tglAkhir+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.e_total.getText())+")");					
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
					this.sg1.clear(1);		this.sg2.clear(1);					
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