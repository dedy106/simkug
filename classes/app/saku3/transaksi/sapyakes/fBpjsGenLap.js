window.app_saku3_transaksi_sapyakes_fBpjsGenLap = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fBpjsGenLap.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fBpjsGenLap";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Premi BPJS", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		//this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"],readOnly:true});
		this.e_periode = new saiCB(this,{bound:[20,13,202,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.bTampil = new portalui_button(this,{bound:[230,13,80,18],caption:"Generate",click:[this,"doGen"]});		
		this.e_bp = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Total BP", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_cc = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Total CC", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		

		this.pc1 = new pageControl(this,{bound:[5,20,990,300], childPage:["Data BP","Data CC"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:0,
				colTitle:["Kode Lokasi","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,100]],
				readOnly:true,
				colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste1"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,				
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:0,
			    colTitle:["Kode Lokasi","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100, 100,100,100,100, 100,100,100,100,100]],
				readOnly:true,
				colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste2"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,				
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPage2"]});


		this.rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from periode where periode > '201806' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_periode.addItem(i,line.periode);
				}
			} 

			this.e_periode.setText("");
			this.e_periode.setText(this.app._periode);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fBpjsGenLap.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fBpjsGenLap.implement({	
	doAfterPaste1: function(sender,totalRow){
		try {						
			var tot = 0;			
			for (var i=0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i)) {
					tot += nilaiToFloat(this.sg1.cells(1,i)) +nilaiToFloat(this.sg1.cells(2,i)) +nilaiToFloat(this.sg1.cells(3,i)) +nilaiToFloat(this.sg1.cells(4,i)) +
						   nilaiToFloat(this.sg1.cells(5,i)) +nilaiToFloat(this.sg1.cells(6,i)) +nilaiToFloat(this.sg1.cells(7,i)) +nilaiToFloat(this.sg1.cells(8,i)) +
						   nilaiToFloat(this.sg1.cells(9,i)) +nilaiToFloat(this.sg1.cells(10,i)) +nilaiToFloat(this.sg1.cells(11,i)) +nilaiToFloat(this.sg1.cells(12,i));
				}
			}
			
			this.e_bp.setText(floatToNilai(tot));
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doAfterPaste2: function(sender,totalRow){
		try {						
			var tot = 0;			
			for (var i=0;i < this.sg2.getRowCount();i++){			
				if (this.sg2.rowValid(i)) {
					tot += nilaiToFloat(this.sg2.cells(1,i)) +nilaiToFloat(this.sg2.cells(2,i)) +nilaiToFloat(this.sg2.cells(3,i)) +nilaiToFloat(this.sg2.cells(4,i)) +
						   nilaiToFloat(this.sg2.cells(5,i)) +nilaiToFloat(this.sg2.cells(6,i)) +nilaiToFloat(this.sg2.cells(7,i)) +nilaiToFloat(this.sg2.cells(8,i)) +
						   nilaiToFloat(this.sg2.cells(9,i)) +nilaiToFloat(this.sg2.cells(10,i)) +nilaiToFloat(this.sg2.cells(11,i)) +nilaiToFloat(this.sg2.cells(12,i));
				}
			}
			
			this.e_cc.setText(floatToNilai(tot));
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();			
		} catch(e) {alert(e);}
	},	
	doGen: function() {						
		var sql = "call sp_bpjs_lap ('"+this.e_periode.getText().substr(0,4)+"','"+this.e_periode.getText()+"')";
		this.dbLib.execQuerySync(sql);			
		
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();
		
		sql.add("delete from yk_bpjs_bpcc where substring(periode,1,4)='"+this.e_periode.getText().substr(0,4)+"'");

		var incPeriod = parseInt(this.e_periode.getText().substr(4,2)) + 1;
		for (var i=0;i < this.sg1.getRowCount();i++){			
			if (this.sg1.rowValid(i)){				
				for (var j=1;j < incPeriod;j++){			
					var periode = this.e_periode.getText().substr(0,4) +(j<10?"0":"")+j;
					sql.add("insert into yk_bpjs_bpcc (kode_lokasi,jenis,periode,nilai) values "+
							"('"+this.sg1.cells(0,i)+"','PEGAWAI','"+periode+"',"+nilaiToFloat(this.sg1.cells(j,i))+")");						
				}			
			}
		}
		for (var i=0;i < this.sg2.getRowCount();i++){			
			if (this.sg2.rowValid(i)){				
				for (var j=1;j < incPeriod;j++){			
					var periode = this.e_periode.getText().substr(0,4) +(j<10?"0":"")+j;
					sql.add("insert into yk_bpjs_bpcc (kode_lokasi,jenis,periode,nilai) values "+
							"('"+this.sg2.cells(0,i)+"','PENSIUN','"+periode+"',"+nilaiToFloat(this.sg2.cells(j,i))+")");						
				}			
			}
		}
		this.dbLib.execArraySQL(sql);

		
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
					this.sg2.clear(1);			
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
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
							this.app._mainForm.pesan(2,"Proses generate telah selesai. ("+ this.e_periode.getText()+")");							
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