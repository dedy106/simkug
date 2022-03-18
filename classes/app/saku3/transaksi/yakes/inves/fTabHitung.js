window.app_saku3_transaksi_yakes_inves_fTabHitung = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fTabHitung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fTabHitung";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung Bunga Tabungan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});		
		this.cb_tab = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"ID Tabungan",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_nama = new saiLabelEdit(this,{bound:[20,25,450,20],caption:"Nama Rekening", readOnly:true});
		this.e_norek = new saiLabelEdit(this,{bound:[20,21,450,20],caption:"No Rekening", readOnly:true});
		this.e_bank = new saiLabelEdit(this,{bound:[20,23,450,20],caption:"Bank", readOnly:true});
		this.e_totbunga = new saiLabelEdit(this,{bound:[790,23,200,20],caption:"Total Bunga", tipeText:ttNilai, text:"0", readOnly:true});

		this.pc1 = new pageControl(this,{bound:[10,18,1000,350], childPage:["Hitung Tabungan"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
				colTitle:["Tanggal","Debet","Kredit","Saldo","Bunga Net","NAB"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],				
				colFormat:[[1,2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], nilaiChange:[this,"doNilaiChange"],																													
				defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.c_periode.items.clear();
			var str = "select periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_periode.addItem(i,line.periode);
				}
			} 

			this.c_periode.setText("");
			this.cb_tab.setSQL("select kode_tab, nama_rek from inv_tabung",["kode_tab","nama_rek"],false,["Kode","Nama Rek"],"and","Daftar Tabungan",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fTabHitung.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fTabHitung.implement({
	doNilaiChange: function(){
		try{			
			var tot = 0 ;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){										
					tot += nilaiToFloat(this.sg1.cells(4,i)); 
				}
			}			
			this.e_totbunga.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
					
					sql.add("delete from inv_tab_kkp where kode_tab='"+this.cb_tab.getText()+"' and periode='"+this.c_periode.getText()+"'");							 

					var ix=0;
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)) {		
							sql.add("insert into inv_tab_kkp (kode_lokasi,tanggal,kode_plan,kode_tab,nab,bunga_net,periode,jenis) values "+
									"('"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','1','"+this.cb_tab.getText()+"',"+nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.c_periode.getText()+"','TAB')");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_tab);
					this.sg1.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){	
		try {
			if (sender == this.c_periode && this.c_periode.getText()!="") {							
				var strSQL = "select dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.c_periode.getText().substr(0,4)+"-"+this.c_periode.getText().substr(4,2)+"-01')+1,0)) as tglakhir";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						var jumhari = line.tglakhir.substr(8,2);
						for (var i=1;i <= jumhari;i++){
							harike = i.toString();
							var tanggal = this.c_periode.getText().substr(0,4)+"-"+this.c_periode.getText().substr(4,2)+"-"+(i<10?"0":"")+harike;
							this.sg1.appendData([tanggal,"0","0","0","0","0"]);						
						}
					}
				}
			}

			if (sender == this.cb_tab && this.cb_tab.getText()!="") {
				var strSQL = "select nama_rek,no_rek,bank from inv_tabung where kode_tab ='"+this.cb_tab.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama_rek);						
						this.e_norek.setText(line.no_rek);						
						this.e_bank.setText(line.bank);												
					}					
				}

				var strSQL = "select substring(convert(varchar,tanggal,121),1,10) as tanggal,sum(case dc when 'D' then nilai else 0 end) as debet,sum(case dc when 'C' then nilai else 0 end) as kredit "+
							 "from inv_tabung_rek where periode='"+this.c_periode.getText()+"' and kode_tab='"+this.cb_tab.getText()+"' group by tanggal order by tanggal";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;											
					for (var i in data.rs.rows){
						line = data.rs.rows[i];								
						for (var j=0;j < this.sg1.getRowCount();j++){
							if (line.tanggal == this.sg1.cells(0,j)) {
								this.sg1.cells(1,j,line.debet);
								this.sg1.cells(2,j,line.kredit);
							}
						}						
					}
				} else this.sg1.clear(1);

				var saldo = nab = 0;
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)) {		
						if (i==0) {
							saldo = nilaiToFloat(this.sg1.cells(2,i)) - nilaiToFloat(this.sg1.cells(1,i));													
						}
						else {
							saldo = saldo + nilaiToFloat(this.sg1.cells(2,i)) - nilaiToFloat(this.sg1.cells(1,i));														
						}
						this.sg1.cells(3,i,saldo);

						if (this.sg1.cells(0,i) != "2019-10-31") {
							var strSQL = "select  ((a.p_bunga/100 / b.basis) * "+nilaiToFloat(this.sg1.cells(3,i))+") * 0.8 as bunga "+
										"from inv_tab_tarif a inner join inv_tabung b on a.kode_tab=b.kode_tab "+
										"where "+nilaiToFloat(this.sg1.cells(3,i))+" between a.s_min and a.s_max and a.kode_tab='"+this.cb_tab.getText()+"' ";
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){						
									this.sg1.cells(4,i,Math.round(parseFloat(line.bunga)));
								}
							}
						}
						else {
							var bunga= 6/100/360*0.8 * nilaiToFloat(this.sg1.cells(3,i));
							this.sg1.cells(4,i,Math.round(bunga));
						}

						nab = nilaiToFloat(this.sg1.cells(3,i)) + nilaiToFloat(this.sg1.cells(4,i));
						this.sg1.cells(5,i,nab);

					}
				}
				this.sg1.validasi();
				
			}	
		}
		catch{
			alert(e);
		}				
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_tab.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});