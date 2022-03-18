window.app_saku3_transaksi_yakes_inves_fBenchMark = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fBenchMark.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fBenchMark";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data BenchMark", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode",tag:2,mustCheck:false});				

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Benchmark"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:21,
					colTitle:["Tanggal","BINDO","IDRE(%)","JIBOR(%)","LQ45","DWJG","SGC","HSI","NIKKEI","YY10Ind","YY10US","YY10JP","INFLRT","GDP", "idx30","idxa80","IDXESGL","ESGIDPR","SKEHATI Idx","Kompas Idx","Abtrindo"],
					colWidth:[[20,19,18,17,16,15,14,  13,12,11,10,9,8,7,6,5,4,3,2,1,0],
							  [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100 ,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12,13, 14,15,16,17,18,19,20],
					          [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn1.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_periode.addItem(i,line.periode);
				}
			}

			var strSQL = "select convert(varchar,getdate(),112) as tgl";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																			
					this.e_periode.setText(line.tgl.toUpperCase().substr(0,6));					
				}
			}
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fBenchMark.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fBenchMark.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();							
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
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
					sql.add("delete from inv_bmark where periode='"+this.e_periode.getText()+"'");

					for (var i=0;i < this.sg1.getRowCount();i++){
						var tglSQL = this.sg1.cells(0,i).substr(6,4)+"-"+this.sg1.cells(0,i).substr(3,2)+"-"+this.sg1.cells(0,i).substr(0,2);		
						sql.add("insert into inv_bmark (periode,tanggal,bindo,idre,jibor,ihsg,lq45,dwjg,sgc,hsi,nikkei,yy10ind,yy10us,yy10jp,inflasi,gdp,  idx30,idx80,esgl,esg,sri,kompas,abtrindo) values "+
								"('"+this.e_periode.getText()+"','"+tglSQL+"',"+nilaiToFloat(this.sg1.cells(1,i))+","+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+",0,"+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+","+nilaiToFloat(this.sg1.cells(8,i))+","+nilaiToFloat(this.sg1.cells(9,i))+","+nilaiToFloat(this.sg1.cells(10,i))+","+nilaiToFloat(this.sg1.cells(11,i))+","+nilaiToFloat(this.sg1.cells(12,i))+","+nilaiToFloat(this.sg1.cells(13,i))+",  "+nilaiToFloat(this.sg1.cells(14,i))+","+nilaiToFloat(this.sg1.cells(15,i))+","+nilaiToFloat(this.sg1.cells(16,i))+","+nilaiToFloat(this.sg1.cells(17,i))+","+nilaiToFloat(this.sg1.cells(18,i))+","+nilaiToFloat(this.sg1.cells(19,i))+","+nilaiToFloat(this.sg1.cells(20,i))+")");
					}
					
					sql.add("update a set a.ihsg=b.h_wajar "+
							"from inv_bmark a inner join inv_shm_harga b on a.tanggal=b.tanggal and b.periode ='"+this.e_periode.getText()+"' and b.kode_saham='IHSG' "+
							"where a.periode='"+this.e_periode.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Periode : "+ this.e_periode.getText()+")");							
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