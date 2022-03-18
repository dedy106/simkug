window.app_saku3_transaksi_yakes_inves_fDepoClose = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fDepoClose.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fDepoClose";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Generate KKP Kas,Saham,RD", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[520,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Closing", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,430], childPage:["Hasil KKP Kas","Hasil KKP Saham","Hasil KKP EBT"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
					colTitle:["Tanggal","NAB"],
					colWidth:[[1,0],[150,80]],colFormat:[[1],[cfNilai]],					
					autoAppend:false,defaultRow:1});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
					colTitle:["Tanggal","NAB"],
					colWidth:[[1,0],[150,80]],colFormat:[[1],[cfNilai]],					
					autoAppend:false,defaultRow:1});							
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2});		

		this.sg3 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
			colTitle:["Tanggal","NAB"],
			colWidth:[[1,0],[150,80]],colFormat:[[1],[cfNilai]],					
			autoAppend:false,defaultRow:1});							
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg3});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var strSQL = "select dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.app._periode.substr(0,4)+"-"+this.app._periode.substr(4,2)+"-01')+1,0)) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.dp_d1.setText(line.tglakhir);
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fDepoClose.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fDepoClose.implement({	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);				
	},
	doLoadKKP: function() {
		var str =  "select tanggal,sum(nilai_depo) as nab from inv_depo_kkp where periode='"+this.e_periode.getText()+"' group by tanggal order by tanggal desc";
		var data = this.dbLib.getDataProvider(str,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;				
			this.sg1.clear();	
			for (var i in data.rs.rows){
				line = data.rs.rows[i];											
				this.sg1.appendData([line.tanggal,floatToNilai(line.nab)]);						
			}
		} else this.sg1.clear(1);

		var str =  "select tanggal,round(sum(h_wajar * jumlah),0) as nab from inv_saham_kkp where periode='"+this.e_periode.getText()+"' group by tanggal order by tanggal desc";
		var data = this.dbLib.getDataProvider(str,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;				
			this.sg2.clear();	
			for (var i in data.rs.rows){
				line = data.rs.rows[i];											
				this.sg2.appendData([line.tanggal,floatToNilai(line.nab)]);						
			}
		} else this.sg2.clear(1);

		var str =  "select tanggal,round(sum(h_wajar * jumlah),0) as nab from inv_rd_kkp where periode='"+this.e_periode.getText()+"' group by tanggal order by tanggal desc";
		var data = this.dbLib.getDataProvider(str,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;				
			this.sg3.clear();	
			for (var i in data.rs.rows){
				line = data.rs.rows[i];											
				this.sg3.appendData([line.tanggal,floatToNilai(line.nab)]);						
			}
		} else this.sg3.clear(1);

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
					sql.add("call sp_gen_depo_kkp ('"+this.dp_d1.getDateString()+"' , '"+this.app._lokasi+"')");
					
					sql.add("call sp_gen_saham_kkp ('"+this.dp_d1.getDateString()+"')");
					sql.add("call sp_gen_rd_kkp ('"+this.dp_d1.getDateString()+"')");														
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Periode : "+ this.e_periode.getText()+")");							
							this.doLoadKKP();
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