window.app_saku3_transaksi_yakes21_inves_fNABdiscre = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fNABdiscre.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fNABdiscre";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form NAB Discre", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");

		this.cb_plan = new saiCBBL(this,{bound:[20,15,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true});		
		this.cb_kelola = new saiCBBL(this,{bound:[20,11,220,20],caption:"Manager Investasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.c_periode = new saiCB(this,{bound:[20,10,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});
		this.e_basis = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Basis", maxLength:10, tag:2, tipeText:ttNilai, text:"365"});				
		this.bHitung = new button(this,{bound:[250,13,80,18],caption:"Hit Fee",click:[this,"doHitFee"]});			
		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,370], childPage:["Detail NAV"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:1,
					colTitle:["Tanggal","NAV","Deposito","Kas","Nilai Wajar","Tier1","Tier2","Tier3","Tier4","SubTot","VAT","Total"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,150,150,150,150,100]],
					colFormat:[[1,2,3,4,5,6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_periode.items.clear();
			var str = "select top 2 periode from periode where kode_lokasi ='"+this.app._lokasi+"' union select substring(convert(varchar,getdate(),112),1,6) order by periode desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_periode.addItem(i,line.periode);
				}
			} 

			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1' and jenis='MI' ",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);												
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);													
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fNABdiscre.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fNABdiscre.implement({	
	doHitFee: function() {		
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i)){		
				var strSQL = "select kurang_seb,nilai_seb, "+
					 "case when persen is null then 0 else round( ( nilai_seb + (("+nilaiToFloat(this.sg1.cells(1,i))+" - kurang_seb) * persen/100)) / "+nilaiToFloat(this.e_basis.getText())+" ,2) end as mi_fee, "+
					 "case when "+
					 "(case when persen is null then 0 else round( ( nilai_seb + (("+nilaiToFloat(this.sg1.cells(1,i))+" - kurang_seb) * persen/100)) / "+nilaiToFloat(this.e_basis.getText())+" ,2) end) > t1 then t1 else 0 end as t1 "+
					 ", "+
					 "case when "+
					 "(case when persen is null then 0 else round( ( nilai_seb + (("+nilaiToFloat(this.sg1.cells(1,i))+" - kurang_seb) * persen/100)) / "+nilaiToFloat(this.e_basis.getText())+" ,2) end) > t2 then t2 else 0 end as t2 "+
					 ", "+
					 "case when "+
					 "(case when persen is null then 0 else round( ( nilai_seb + (("+nilaiToFloat(this.sg1.cells(1,i))+" - kurang_seb) * persen/100)) / "+nilaiToFloat(this.e_basis.getText())+" ,2) end) > t3 then t3 else 0 end as t3 "+					
					 "from inv_tier "+
					 "where "+nilaiToFloat(this.sg1.cells(1,i))+" between bawah and atas "+
					 "and kode_kelola='"+this.cb_kelola.getText()+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) { 																			
						var sisa = parseFloat(line.mi_fee) - (parseFloat(line.t1) + parseFloat(line.t2) + parseFloat(line.t3));
						var ppn = Math.round(parseFloat(line.mi_fee) * 0.10);
						this.sg1.cells(5,i,parseFloat(line.t1));
						this.sg1.cells(6,i,parseFloat(line.t2));
						this.sg1.cells(7,i,parseFloat(line.t3));
						this.sg1.cells(8,i,sisa);
						this.sg1.cells(9,i,parseFloat(line.mi_fee));
						this.sg1.cells(10,i,ppn);
						this.sg1.cells(11,i,parseFloat(line.mi_fee)+ppn);
					}					
				}	
			}			
		}
	},	
	doChange: function(sender) {
		if (sender == this.cb_kelola || this.c_periode) {
			if (this.cb_kelola.getText()!="" && this.c_periode.getText()!="") {						
				var strSQL = "select a.tanggal,isnull(b.nab,0) as nabdis,isnull(b.depo,0) as depodis,isnull(b.kas,0) as kasdis,a.nab as nwajar "+
							 ",isnull(b.t1,0) as t1,isnull(b.t2,0) as t2,isnull(b.t3,0) as t3,isnull(b.t4,0) as t4 "+
							 ",isnull(b.t1+b.t2+b.t3+b.t4,0) as subtot "+
							 ",isnull(b.t1+b.t2+b.t3+b.t4,0) * 0.1 as ppn "+
							 ",isnull(b.t1+b.t2+b.t3+b.t4,0) + (isnull(b.t1+b.t2+b.t3+b.t4,0) * 0.1) as total "+
							 "from ( "+
							 "	  select tanggal,nab,kode_kelola "+
							 "	  from inv_sahammi_kkp "+
							 "    where kode_kelola ='"+this.cb_kelola.getText()+"' and kode_plan='1' and periode='"+this.c_periode.getText()+"' and tanggal>'2019-12-30' "+ 
							 "    ) a "+
							 "	  left join inv_discre_his b on a.kode_kelola=b.kode_kelola and a.tanggal=b.tanggal "+
							 "order by a.tanggal ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.tanggal,"0",floatToNilai(line.depodis),floatToNilai(line.kasdis),floatToNilai(line.nwajar),"0","0","0","0", "0","0","0"]);
					
						//tampil 4 digit
						var nav = Math.round(parseFloat(line.nabdis) * 10000) / 10000;
						this.sg1.cells(1,i,nav);
						
					}
				} else this.sg1.clear(1);
			}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																			
					
					var strSQL = "select top 1 periode from inv_discre_his where kode_kelola='"+this.cb_kelola.getText()+"' and periode='"+this.c_periode.getText()+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							var stsInput = "E";
						}
						else {
							var stsInput = "I";
						}
					}	

					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){		
							if (stsInput == "I") {					
								sql.add("insert into inv_discre_his (periode,kode_kelola,tanggal,nab,depo,kas,nwajar,t1,t2,t3,t4,treal,ppnrel,no_ref,basis,no_akru) values "+
										"('"+this.c_periode.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(1,i))+","+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+","+nilaiToFloat(this.sg1.cells(8,i))+",0,0,'-',"+nilaiToFloat(this.e_basis.getText())+",'-')");
							}
							else {								
								sql.add("update inv_discre_his set nab="+nilaiToFloat(this.sg1.cells(1,i))+",depo="+nilaiToFloat(this.sg1.cells(2,i))+",kas="+nilaiToFloat(this.sg1.cells(3,i))+",nwajar="+nilaiToFloat(this.sg1.cells(4,i))+", t1="+nilaiToFloat(this.sg1.cells(5,i))+",t2="+nilaiToFloat(this.sg1.cells(6,i))+",t3="+nilaiToFloat(this.sg1.cells(7,i))+", t4="+nilaiToFloat(this.sg1.cells(8,i))+" "+
										"where tanggal='"+this.sg1.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"' ");
							}
						}
					}
					
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
				if (modalResult == mrOk)	
					this.sg1.clear(1);				
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Periode : "+ this.c_periode.getText()+")");	
							this.app._mainForm.bClear.click();													
						}
						else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});